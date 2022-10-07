import React from 'react';
import CircularBtn from '../CircularBtn/CircularBtn';

function PendingTaskPlayBtn({ taskId }) {
  const handleClick = (event) => {
    console.log('taskId', taskId);
  };
  return (
    <div onClick={handleClick}>
      <CircularBtn icon='play_circle_filled' />
    </div>
  );
}

export default PendingTaskPlayBtn;
