import React from 'react';
import CircularBtn from '../CircularBtn/CircularBtn';

const ProcessingTaskPauseBtn = () => {
  const handleClick = (event) => {
    event.preventDefault();
    console.log('btn pause is clicked');
  };
  return (
    <div onClick={handleClick}>
      <CircularBtn icon='pause_circle' />
    </div>
  );
};

export default ProcessingTaskPauseBtn;
