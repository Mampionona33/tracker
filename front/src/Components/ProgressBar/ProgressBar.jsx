import React from 'react';
import {
  ProgresBarCont,
  ProgressBarBul,
  ProgressBarBulCont,
  ProgressBarValue,
} from './ProgressBar.styled';

const ProgressBar = ({ completed = 0 }) => {
  console.log(completed);
  return (
    <ProgresBarCont>
      <ProgressBarValue completed={completed}>
        <ProgressBarBulCont>
          <ProgressBarBul completed={completed}>
            {completed.toString().padStart(2, 0)}%
          </ProgressBarBul>
        </ProgressBarBulCont>
      </ProgressBarValue>
    </ProgresBarCont>
  );
};

export default ProgressBar;
