import React, { useEffect } from 'react';
import useGetProcessingTask from '../../assets/Hooks/useGetProcessingTask';
import {
  ProcessingTaskTimerCont,
  ProcessingTaskTimerDigitCon,
} from './ProcessingTaskTimer.styled';

const ProcessingTaskTimer = () => {
  const { processingTask, loadingUserTask } = useGetProcessingTask();

  useEffect(() => {
    if (processingTask && processingTask.length > 0) {
      console.log(processingTask);
    }
  }, [processingTask]);

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
