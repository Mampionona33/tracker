import { useQuery } from '@apollo/client';
import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../context/authContext';
import { GET_USER_TASK } from '../graphql/Query';
import '../style/Processing.scss';
import BtnEdit from './BtnEdit';
import BtnPausePlaySwitch from './BtnPausePlaySwitch';
import Clock from './Clock';
import Loading from './Loading';
import ProdProgressBar from './ProdProgressBar';

export default function Processing() {
  const userContext = useContext(AuthContext);
  const [currentProcessingTask, setCurrentProcessingTask] = useState([]);
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
              {currentProcessingTask.boothNumber}
            </p>
          </div>

          <div className='row'>
            <h4 className='row__element --title'>TASK TYPE</h4>
            <p className='row__element row__element--r'>
              <span className='translateX'>{currentProcessingTask.type}</span>
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
                {currentProcessingTask.url}
              </a>
            </div>
          </div>

          <div className='row'>
            <h4 className='row__element --title'>CATEGORY</h4>
            <p className='row__element row__element--r '>
              <span className='translateX'>{currentProcessingTask.cat}</span>
            </p>
          </div>

          <div className='row'>
            <h4 className='row__element --title'>STATUS COM</h4>
            <p className='row__element row__element--r'>
              {currentProcessingTask.statCom}
            </p>
          </div>

          <div className='row'>
            <h4 className='row__element --title'>STATUS IVPN</h4>
            <p className='row__element row__element--r'>
              {currentProcessingTask.ivpn}
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
                value={currentProcessingTask.comment}
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
            </div>
          </div>
        </div>
      ) : (
        <div className='message'>
          <h2>NO PROCESSING TASK</h2>
          <p>Please create new task or chose one from Pending</p>
        </div>
      )}
    </>
  );
}
