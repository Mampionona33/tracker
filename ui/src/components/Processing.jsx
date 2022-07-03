import { useQuery } from '@apollo/client';
import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../context/authContext';
import { TaskContext } from '../context/taskContext';
import { GET_USER_TASK, GET_USER_TASK_PLAY } from '../graphql/Query';
import '../style/Processing.scss';

export default function Processing() {
  const userContext = useContext(AuthContext);
  const userContextUser = userContext.user;
  const [currentProcessingTask, setCurrentProcessingTask] = useState([]);

  const {
    data: userTaskPlay,
    loading: userDataLoading,
    error: errorLoadingUserData,
  } = useQuery(GET_USER_TASK_PLAY, {
    variables: {
      input: {
        user: {
          sub: userContextUser && userContextUser.sub,
        },
        taskState: 'isPlay' || 'isPause',
      },
    },
  });

  useEffect(() => {
    // Get the user curent task pause or play
    if (userTaskPlay) {
      setCurrentProcessingTask(userTaskPlay.getUserTaskPlay[0]);
    }
  }, [userTaskPlay]);

  return (
    <>
      {currentProcessingTask ? (
        <div className='processing'>
          <div className='row'>
            <h4 className='row__element'>BOOTH NUMBER</h4>
            <p className='row__element row__element--r'>
              {currentProcessingTask.boothNumber}
            </p>
          </div>

          <div className='row'>
            <h4 className='row__element'>TASK TYPE</h4>
            <p className='row__element row__element--r'>
              {currentProcessingTask.type}
            </p>
          </div>

          <div className='row'>
            <h4 className='row__element'>BOOTH URL</h4>
            <a
              target='_blank'
              className='row__element row__element--r'
              href={currentProcessingTask.url}
            >
              {currentProcessingTask.url}
            </a>
          </div>

          <div className='row'>
            <h4 className='row__element'>CATEGORY</h4>
            <p className='row__element row__element--r'>
              {currentProcessingTask.cat}
            </p>
          </div>

          <div className='row'>
            <h4 className='row__element'>STATUS IVPN</h4>
            <p className='row__element row__element--r'>
              {currentProcessingTask.ivpn}
            </p>
          </div>

          <div className='row'>
            <h4 className='row__element'>NB BEFORE</h4>
            <p className='row__element row__element--r'>
              {currentProcessingTask.nbBefore}
            </p>
          </div>

          <div className='row'>
            <h4 className='row__element'>NB AFTER</h4>
            <p className='row__element row__element--r'>
              {currentProcessingTask.nbAfter}
            </p>
          </div>

          <div className='row'>
            <h4 className='row__element'>COMMENT</h4>
            <p className='row__element row__element--r'>
              {currentProcessingTask.comment}
            </p>
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
