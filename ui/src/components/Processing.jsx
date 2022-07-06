import { useQuery } from '@apollo/client';
import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../context/authContext';
import { TaskContext } from '../context/taskContext';
import { GET_USER_PROCESSING_TASK, GET_USER_TASK } from '../graphql/Query';
import '../style/Processing.scss';

export default function Processing() {
  const userContext = useContext(AuthContext);
  const [currentProcessingTask, setCurrentProcessingTask] = useState([]);

  const { data: userTask, error: errorFetchUserTask } = useQuery(
    GET_USER_TASK,
    {
      variables: {
        input: {
          sub: userContext && userContext.user.sub,
        },
      },
    }
  );

  useEffect(() => {
    if (userTask) {
      const processingTask = userTask.getUserTask.filter(
        (item) => item.taskState === 'isPause' || item.taskState === 'isPlay'
      );
      console.log(processingTask);
      if (processingTask) {
        setCurrentProcessingTask((prev) => processingTask[0]);
      }
    }
  }, [userTask]);

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
