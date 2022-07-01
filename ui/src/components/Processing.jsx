import React, { useContext } from 'react';
import { TaskContext } from '../context/taskContext';
import '../style/Processing.scss';

export default function Processing() {
  const taskContext = useContext(TaskContext);
  const currentTaskPlay = taskContext.userTaskPlay;
  console.log(taskContext.userTaskPlay);
  return (
    <>
      {taskContext.userTaskPlay ? (
        <div className='processing'>
          <div className='row'>
            <h4 className='row__element'>BOOTH NUMBER</h4>
            <p className='row__element row__element--r'>
              {currentTaskPlay[0].boothNumber}
            </p>
          </div>

          <div className='row'>
            <h4 className='row__element'>TASK TYPE</h4>
            <p className='row__element row__element--r'>
              {currentTaskPlay[0].type}
            </p>
          </div>

          <div className='row'>
            <h4 className='row__element'>BOOTH URL</h4>
            <a
              target='_blank'
              className='row__element row__element--r'
              href={currentTaskPlay[0].url}
            >
              {currentTaskPlay[0].url}
            </a>
          </div>

          <div className='row'>
            <h4 className='row__element'>CATEGORY</h4>
            <p className='row__element row__element--r'>
              {currentTaskPlay[0].cat}
            </p>
          </div>

          <div className='row'>
            <h4 className='row__element'>STATUS IVPN</h4>
            <p className='row__element row__element--r'>
              {currentTaskPlay[0].ivpn}
            </p>
          </div>

          <div className='row'>
            <h4 className='row__element'>NB BEFORE</h4>
            <p className='row__element row__element--r'>
              {currentTaskPlay[0].nbBefore}
            </p>
          </div>

          <div className='row'>
            <h4 className='row__element'>NB AFTER</h4>
            <p className='row__element row__element--r'>
              {currentTaskPlay[0].nbAfter}
            </p>
          </div>

          <div className='row'>
            <h4 className='row__element'>COMMENT</h4>
            <p className='row__element row__element--r'>
              {currentTaskPlay[0].comment}
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
