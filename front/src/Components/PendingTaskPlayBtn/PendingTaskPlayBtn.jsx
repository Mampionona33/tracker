import React from 'react';
import CircularBtn from '../CircularBtn/CircularBtn';
import useGetProcessingTask from './../../assets/Hooks/useGetProcessingTask';

function PendingTaskPlayBtn({ taskId }) {
  const { processingTask } = useGetProcessingTask();
  const handleClick = (event) => {
    console.log('taskId', taskId);
    console.log(
      processingTask
        ? processingTask.reduce((a, b) => a + b).id
        : 'no processing task'
    );
  };
  return (
    <div onClick={handleClick}>
      <CircularBtn icon='play_circle_filled' />
    </div>
  );
}

export default PendingTaskPlayBtn;
