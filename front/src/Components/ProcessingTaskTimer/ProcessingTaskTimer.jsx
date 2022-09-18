import React, { useEffect, useState } from 'react';
import useGetProcessingTask from '../../assets/Hooks/useGetProcessingTask';
import { difDate, secondToDayHourMinSec } from '../../assets/timeUtility';
import {
  ProcessingTaskTimerCont,
  ProcessingTaskTimerDigitCon,
} from './ProcessingTaskTimer.styled';

const ProcessingTaskTimer = () => {
  const { processingTask, loadingUserTask } = useGetProcessingTask();

  const [timerDay, setTimerDay] = useState(0);
  const [timerHours, setTimerHours] = useState(0);
  const [timerMinites, setTimerMinites] = useState(0);
  const [timerSec, setTimerSec] = useState(0);

  useEffect(() => {
    if (processingTask && processingTask.length > 0) {
      processingTask.map((item) => {
        const taskState = item.taskState;
        const session = Array.from(item.session);
        const elpastedTime = session
          .map((se) => {
            return !se.sessionStop
              ? difDate(se.sessionStart, new Date())
              : difDate(se.sessionStart, se.sessionStop);
          })
          .reduce((a, b) => a + b);
        const day = secondToDayHourMinSec(elpastedTime).day;
        const hours = secondToDayHourMinSec(elpastedTime).hours;
        const minutes = secondToDayHourMinSec(elpastedTime).minutes;

        if (taskState === 'isPause') {
          const sec = secondToDayHourMinSec(elpastedTime).secondes;
          console.log(taskState);
          setTimerDay((prev) => day);
          setTimerHours((prev) => hours);
          setTimerMinites((prev) => minutes);
          setTimerSec((prev) => sec);
        }
        if (taskState === 'isPlay') {
          const sec = secondToDayHourMinSec(elpastedTime).secondes;
          console.log(taskState);
          let tic = sec;
          setInterval()
          const interval = setInterval(() => {
            setTimerDay((prev) => day);
            setTimerHours((prev) => hours);
            setTimerMinites((prev) => minutes);
            setTimerSec(tic++);
          }, [1000]);
          return () => clearInterval(interval);
        }
      });
    }
  }, [processingTask]);

  return (
    <ProcessingTaskTimerCont>
      <ProcessingTaskTimerDigitCon>
        <div>{timerDay}</div>
        <div>day</div>
      </ProcessingTaskTimerDigitCon>

      <ProcessingTaskTimerDigitCon>
        <div>{timerHours}</div>
        <div>Hrs</div>
      </ProcessingTaskTimerDigitCon>
      <ProcessingTaskTimerDigitCon>
        <div>{timerMinites}</div>
        <div>Min</div>
      </ProcessingTaskTimerDigitCon>
      <ProcessingTaskTimerDigitCon>
        <div>{timerSec}</div>
        <div>sec</div>
      </ProcessingTaskTimerDigitCon>
    </ProcessingTaskTimerCont>
  );
};

export default ProcessingTaskTimer;
