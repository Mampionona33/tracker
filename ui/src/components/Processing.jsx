import { useQuery } from '@apollo/client';
import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../context/authContext';
import { TaskContext } from '../context/taskContext';
import { GET_USER_TASK, GET_USER_TASK_PLAY } from '../graphql/Query';
import '../style/Processing.scss';

export default function Processing() {
  const taskContext = useContext(TaskContext);
  const userContext = useContext(AuthContext);
  const userContextUser = userContext.user;
  const [taskPlay, setTaskPlay] = useState([]);

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
        taskState: 'isPlay',
      },
    },
  });

  useEffect(() => {
    if (userTaskPlay) {
      console.log(userTaskPlay);
      setTaskPlay(userTaskPlay.getUserTaskPlay[0]);
    }
  }, [userTaskPlay]);

  return (
    <>
      {taskPlay ? (
        <div className='processing'>
          <div className='row'>
            <h4 className='row__element'>BOOTH NUMBER</h4>
            <p className='row__element row__element--r'>
              {taskPlay.boothNumber}
            </p>
          </div>

          <div className='row'>
            <h4 className='row__element'>TASK TYPE</h4>
            <p className='row__element row__element--r'>{taskPlay.type}</p>
          </div>

          <div className='row'>
            <h4 className='row__element'>BOOTH URL</h4>
            <a
              target='_blank'
              className='row__element row__element--r'
              href={taskPlay.url}
            >
              {taskPlay.url}
            </a>
          </div>

          <div className='row'>
            <h4 className='row__element'>CATEGORY</h4>
            <p className='row__element row__element--r'>{taskPlay.cat}</p>
          </div>

          <div className='row'>
            <h4 className='row__element'>STATUS IVPN</h4>
            <p className='row__element row__element--r'>{taskPlay.ivpn}</p>
          </div>

          <div className='row'>
            <h4 className='row__element'>NB BEFORE</h4>
            <p className='row__element row__element--r'>{taskPlay.nbBefore}</p>
          </div>

          <div className='row'>
            <h4 className='row__element'>NB AFTER</h4>
            <p className='row__element row__element--r'>{taskPlay.nbAfter}</p>
          </div>

          <div className='row'>
            <h4 className='row__element'>COMMENT</h4>
            <p className='row__element row__element--r'>{taskPlay.comment}</p>
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
