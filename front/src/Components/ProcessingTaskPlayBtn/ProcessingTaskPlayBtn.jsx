import React from 'react';
import CircularBtn from '../CircularBtn/CircularBtn';

function ProcessingTaskPlayBtn() {
  const handleClick = () => {
    console.log('btn play clicekd');
  };

  return (
    <div onClick={handleClick}>
      <CircularBtn icon='play_circle_filled' />
    </div>
  );
}

export default ProcessingTaskPlayBtn;
