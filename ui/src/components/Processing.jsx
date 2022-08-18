import { useQuery } from '@apollo/client';
import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../context/authContext';
import { componentContext } from '../context/componentContext';
import { GET_USER_TASK } from '../graphql/Query';
import '../style/Processing.scss';
import BtnEdit from './BtnEdit';
import BtnPausePlaySwitch from './BtnPausePlaySwitch';
import BtnSubmit from './BtnSubmit';
import Clock from './Clock';
import Loading from './Loading';
import ProdProgressBar from './ProdProgressBar';
import { useNavigate } from 'react-router-dom';

export default function Processing() {
  const userContext = useContext(AuthContext);
  const ComponentContext = useContext(componentContext);
  const [currentProcessingTask, setCurrentProcessingTask] = useState([]);
  const navigate = useNavigate();
  const {
    data: userTask,
    error: errorFetchUserTask,
    loading: loadingUserTask,
  } = useQuery(GET_USER_TASK, {
    variables: {
      input: {
        sub: userContext && userContext.user.sub,
      },
    },
  });

  const handleClickTextCreateNewTask = (event) => {
    event.preventDefault();
    ComponentContext.toggleDialogCreateNewTask();
  };

  useEffect(() => {
    if (userTask) {
      const processingTask = userTask.getUserTask.filter(
        (item) => item.taskState === 'isPause' || item.taskState === 'isPlay'
      );
      if (processingTask) {
        setCurrentProcessingTask((prev) => processingTask[0]);
      }
    }
  }, [userTask]);

  const handleClickMytaskText = (event) => {
    navigate('/mytasks/row_show=3', { replace: true });
  };

  if (loadingUserTask) {
    return <Loading />;
  }

  return (
    <>
      {currentProcessingTask ? (
        <div className='processing'>
          <div className='row'>
            <h4 className='row__element --title'>BOOTH NUMBER</h4>
            <p className='row__element row__element--r'>
              {currentProcessingTask.boothNumber
                ? currentProcessingTask.boothNumber
                : ''}
            </p>
          </div>

          <div className='row'>
            <h4 className='row__element --title'>TASK TYPE</h4>
            <p className='row__element row__element--r'>
              <span className='translateX'>
                {currentProcessingTask.type ? currentProcessingTask.type : ''}
              </span>
            </p>
          </div>

          <div className='row'>
            <h4 className='row__element --title'>BOOTH URL</h4>
            <div className='row__element row__element--r'>
              <a
                className='translateX'
                target='_blank'
                href={currentProcessingTask.url}
              >
                {currentProcessingTask.url ? currentProcessingTask.url : ''}
              </a>
            </div>
          </div>

          <div className='row'>
            <h4 className='row__element --title'>CATEGORY</h4>
            <p className='row__element row__element--r '>
              <span className='translateX'>
                {currentProcessingTask.cat ? currentProcessingTask.cat : ''}
              </span>
            </p>
          </div>

          <div className='row'>
            <h4 className='row__element --title'>STATUS COM</h4>
            <p className='row__element row__element--r'>
              {currentProcessingTask.statCom
                ? currentProcessingTask.statCom
                : ''}
            </p>
          </div>

          <div className='row'>
            <h4 className='row__element --title'>STATUS IVPN</h4>
            <p className='row__element row__element--r'>
              {currentProcessingTask.ivpn ? currentProcessingTask.ivpn : ''}
            </p>
          </div>

          <div className='row'>
            <h4 className='row__element --title'>NB BEFORE</h4>
            <p className='row__element row__element--r'>
              {currentProcessingTask.nbBefore}
            </p>
          </div>

          <div className='row'>
            <h4 className='row__element --title'>NB AFTER</h4>
            <p className='row__element row__element--r'>
              {currentProcessingTask.nbAfter}
            </p>
          </div>

          <div className='row'>
            <h4 className='row__element --title'>COMMENT</h4>
            <div className='row__element row__element--r'>
              <textarea
                disabled
                style={{ maxHeight: '5rem', maxWidth: '9rem', width: '8rem' }}
                value={
                  currentProcessingTask.comment
                    ? currentProcessingTask.comment
                    : ''
                }
              />
            </div>
          </div>
          <hr />
          <div className='row'>
            <h4 className='row__element --title'>ELAPSTED TIME</h4>
            <Clock />
          </div>
          <div className='row'>
            <h4 className='row__element --title'>PRODUCTIVITY</h4>
            <ProdProgressBar />
          </div>
          <hr />
          <div className='row '>
            <h4 className='row__element --title'>ACTIONS</h4>
            <div className='--flexCenter'>
              <BtnPausePlaySwitch />
              <BtnEdit dataName={'processingTask'} />
              <BtnSubmit />
            </div>
          </div>
        </div>
      ) : (
        <div
          className='message'
          style={{ display: 'flex', margin: '1rem', flexDirection: 'column' }}
        >
          <h2 style={{ fontSize: '1.2rem', margin: '0' }}>
            NO PROCESSING TASK
          </h2>
          <div style={{ display: 'block', gap: '0.5rem' }}>
            Please{' '}
            <span
              className='textBtn midAub'
              style={{
                padding: '0 0.5rem',
                borderRadius: 10,
                alignContent: 'center',
              }}
              onClick={(e) => {
                handleClickTextCreateNewTask(e);
              }}
            >
              create new task
            </span>{' '}
            or choose one from{' '}
            <span
              onClick={handleClickMytaskText}
              style={{
                cursor: 'pointer',
                padding: '0 0.5rem',
                borderRadius: 10,
                alignContent: 'center',
              }}
              className='textBtn midAub'
            >
              My Tasks{' '}
            </span>
            .
          </div>
        </div>
      )}
    </>
  );
}
