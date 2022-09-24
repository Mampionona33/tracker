import React from 'react';
import { ProgresBarCont, ProgressBarValue } from './ProgressBar.styled';

const ProgressBar = ({ completed = 0 }) => {
  console.log(completed);
  return (
    <ProgresBarCont>
      <ProgressBarValue completed={completed}></ProgressBarValue>
    </ProgresBarCont>
  );
};

export default ProgressBar;
