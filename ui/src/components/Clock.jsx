import { useQuery } from '@apollo/client';
import React, { useContext, useEffect, useState } from 'react';
import { difDate, secondToDayHourMinSec } from '../assets/timeUtility';
import { AuthContext } from '../context/authContext';
import { GET_USER_TASK } from '../graphql/Query';
import Card from './Card';
import '../style/Clock.scss';
import { TaskContext } from '../context/taskContext';

const Clock = () => {
  const userContext = useContext(AuthContext);
  const [day, setDay] = useState('00');
  const [hours, setHours] = useState('00');
  const [min, setMin] = useState('00');
  const [sec, setSec] = useState('00');

  const taskContext = useContext(TaskContext);
  const {
    data: allUserTasks,
    refetch: refetchAllUserTask,
    loading: loadingUserTask,
    error: errorOnLoadingAllUserTask,
  } = useQuery(GET_USER_TASK, {
    variables: {
      input: {
        sub: userContext.user.sub,
      },
    },
  });

  useEffect(() => {
    if (allUserTasks && allUserTasks.getUserTask) {
      const processingTask = Array.from(allUserTasks.getUserTask).filter(
        (item) => item.taskState === 'isPause' || item.taskState === 'isPlay'
      );
      const elapstedTimeArray = [];
      if (processingTask.length > 0) {
        for (let i = 0; i < processingTask.length; i++) {
          const taskState = processingTask[i].taskState;
          const session = Array.from(processingTask[i].session);
          for (let a = 0; a < session.length; a++) {
            const sessionStart = session[a].sessionStart;
            const sessionStop = session[a].sessionStop;
            const dif = sessionStop && difDate(sessionStart, sessionStop);
            elapstedTimeArray.push(dif);

            // if sessionStop === null => set session stop new Date
            !sessionStop &&
              elapstedTimeArray.push(
                difDate(sessionStart, new Date().toISOString())
              );
          }
        }
      }
      if (elapstedTimeArray.length > 0) {
        if (processingTask.length > 0) {
          const taskState = processingTask[0].taskState;
          if (taskState === 'isPause') {
            const sumElapstedTime = elapstedTimeArray.reduce((a, b) => a + b);
            setDay(
              secondToDayHourMinSec(sumElapstedTime)
                .day.toString()
                .padStart(2, '0')
            );
            setHours((prev) =>
              secondToDayHourMinSec(sumElapstedTime)
                .hours.toString()
                .padStart(2, '0')
            );
            setMin((prev) =>
              secondToDayHourMinSec(sumElapstedTime)
                .minutes.toString()
                .padStart(2, '0')
            );
            setSec(
              secondToDayHourMinSec(sumElapstedTime)
                .secondes.toString()
                .padStart(2, '0')
            );
          }
          if (taskState === 'isPlay') {
            const interval = setInterval(() => {
              elapstedTimeArray.push(1);
              const sumElapstedTime = elapstedTimeArray.reduce((a, b) => a + b);
              setDay(
                secondToDayHourMinSec(sumElapstedTime)
                  .day.toString()
                  .padStart(2, '0')
              );
              setHours((prev) =>
                secondToDayHourMinSec(sumElapstedTime)
                  .hours.toString()
                  .padStart(2, '0')
              );
              setMin((prev) =>
                secondToDayHourMinSec(sumElapstedTime)
                  .minutes.toString()
                  .padStart(2, '0')
              );
              setSec(
                secondToDayHourMinSec(sumElapstedTime)
                  .secondes.toString()
                  .padStart(2, '0')
              );
            }, [1000]);
            return () => clearInterval(interval);
          }
        }
      }
    }
  }, [allUserTasks]);

  return (
    <div style={{ display: 'flex', gap: '0.2rem' }}>
      <Card Children={<p className='timerDigit'>{day}</p>} />
      <Card Children={<p className='timerDigit'>{hours}</p>} />
      <Card Children={<p className='timerDigit'>{min}</p>} />
      <Card Children={<p className='timerDigit'>{sec}</p>} />
    </div>
  );
};

export default Clock;
