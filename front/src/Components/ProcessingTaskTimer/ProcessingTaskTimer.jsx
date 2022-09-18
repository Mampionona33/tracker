import React, { useEffect, useState, useRef } from 'react';
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

  const interval = useRef(null);

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
        const sec = secondToDayHourMinSec(elpastedTime).secondes;
        setTimerDay((prev) => day);
        setTimerHours((prev) => hours);
        setTimerMinites((prev) => minutes);
        setTimerSec((prev) => sec);

        if (taskState === 'isPause') {
          clearInterval(interval.current);
        }
        if (taskState === 'isPlay') {
          let tic = sec;

          if (timerMinites > 59) {
            setTimerMinites((prev) => 0);
            setTimerHours((prev) => prev + 1);
          }

          if (timerHours > 23) {
            setTimerHours((prev) => 0);
            setTimerDay((prev) => prev + 1);
          }

          interval.current = setInterval(() => {
            tic++;
            if (tic > 59) {
              tic = 0;
              setTimerMinites((prev) => prev + 1);
            }
            setTimerSec((prev) => tic);
          }, 1000);
        }
      });
      return () => clearInterval(interval.current);
    }
  }, [processingTask, timerDay, timerHours, timerMinites]);

  return (
    <ProcessingTaskTimerCont>
      <ProcessingTaskTimerDigitCon>
        <div>{timerDay.toString().padStart(2, '0')}</div>
        <div>day</div>
      </ProcessingTaskTimerDigitCon>

      <ProcessingTaskTimerDigitCon>
        <div>{timerHours.toString().padStart(2, '0')}</div>
        <div>Hrs</div>
      </ProcessingTaskTimerDigitCon>
      <ProcessingTaskTimerDigitCon>
        <div>{timerMinites.toString().padStart(2, '0')}</div>
        <div>Min</div>
      </ProcessingTaskTimerDigitCon>
      <ProcessingTaskTimerDigitCon>
        <div>{timerSec.toString().padStart(2, '0')}</div>
        <div>sec</div>
      </ProcessingTaskTimerDigitCon>
    </ProcessingTaskTimerCont>
  );
};

export default ProcessingTaskTimer;
