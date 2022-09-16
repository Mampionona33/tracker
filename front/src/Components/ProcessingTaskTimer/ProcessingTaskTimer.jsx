import React from 'react';
import {
  ProcessingTaskTimerCont,
  ProcessingTaskTimerDigitCon,
} from './ProcessingTaskTimer.styled';

const ProcessingTaskTimer = () => {
  return (
    <ProcessingTaskTimerCont>
      <ProcessingTaskTimerDigitCon>
        <div>00</div>
        <div>day</div>
      </ProcessingTaskTimerDigitCon>

      <ProcessingTaskTimerDigitCon>
        <div>00</div>
        <div>Hrs</div>
      </ProcessingTaskTimerDigitCon>
      <ProcessingTaskTimerDigitCon>
        <div>00</div>
        <div>Min</div>
      </ProcessingTaskTimerDigitCon>
      <ProcessingTaskTimerDigitCon>
        <div>00</div>
        <div>sec</div>
      </ProcessingTaskTimerDigitCon>
    </ProcessingTaskTimerCont>
  );
};

export default ProcessingTaskTimer;
