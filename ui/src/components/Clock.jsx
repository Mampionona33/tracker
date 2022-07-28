import { useQuery } from '@apollo/client';
import React, { useContext, useEffect, useState } from 'react';
import { difDate, secondToDayHourMinSec } from '../assets/img/timeUtility';
import { AuthContext } from '../context/authContext';
import { GET_USER_TASK } from '../graphql/Query';
import Card from './Card';
import '../style/Clock.scss';

const Clock = () => {
  const userContext = useContext(AuthContext);
  const [day, setDay] = useState('00');
  const [hours, setHours] = useState('00');
  const [min, setMin] = useState('00');
  const [sec, setSec] = useState('00');
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
      const userTasks = Array.from(allUserTasks.getUserTask);
      const taskPlay = userTasks.filter((item) => item.taskState === 'isPlay');
      const taskPause = userTasks.filter(
        (item) => item.taskState === 'isPause'
      );
      const sessionPause = taskPause.map((item) => item.session);
      const sessionPlay = taskPlay.map((item) => item.session);
      const elapstedTimeArray = [];

      // if taskState === isPlay
      for (let i = 0; i < sessionPlay.length; i++) {
        const sessionArray = Array.from(sessionPlay[i]);
        for (let a = 0; a < sessionArray.length; a++) {
          if (sessionArray[a].sessionStop) {
            elapstedTimeArray.push(
              difDate(sessionArray[a].sessionStart, sessionArray[a].sessionStop)
            );
            const elapStedTimeDatex = elapstedTimeArray.reduce((a, b) => a + b);
          }

          if (!sessionArray[a].sessionStop) {
            elapstedTimeArray.push(
              difDate(sessionArray[a].sessionStart, new Date())
            );

            const dateNow = difDate(sessionArray[a].sessionStart, new Date());
            elapstedTimeArray.push(dateNow);

            const elapStedTimeDatex = elapstedTimeArray.reduce((a, b) => a + b);

            const interval = setInterval(() => {
              elapstedTimeArray.push(1);
              if (elapstedTimeArray.length > 0) {
                const elapStedTimeDate = elapstedTimeArray.reduce(
                  (a, b) => a + b
                );
                const d = secondToDayHourMinSec(elapStedTimeDate).day;
                d && setDay((prev) => d.toString().padStart(2, '0'));
                const hrs = secondToDayHourMinSec(elapStedTimeDate).hours;
                hrs && setHours((prev) => hrs.toString().padStart(2, '0'));
                const minutes = secondToDayHourMinSec(elapStedTimeDate).minutes;
                minutes && setMin((pev) => minutes.toString().padStart(2, '0'));
                const second = secondToDayHourMinSec(elapStedTimeDate).secondes;
                second && setSec((prev) => second.toString().padStart(2, '0'));
              }
            }, 1000);
            return () => clearInterval(interval);
          }
        }
      }

      // if taskState === isPause
      for (let i = 0; i < sessionPause.length; i++) {
        const sessionPauseArray = Array.from(sessionPause[i]);
        for (let a = 0; a < sessionPauseArray.length; a++) {
          elapstedTimeArray.push(
            difDate(
              sessionPauseArray[a].sessionStart,
              sessionPauseArray[a].sessionStop
            )
          );
        }
        if (elapstedTimeArray.length > 0) {
          const elapstedTimeDatePause = elapstedTimeArray.reduce(
            (a, b) => a + b
          );
          // console.log(elapstedTimeDatePause);
          setDay((prev) =>
            secondToDayHourMinSec(elapstedTimeDatePause)
              .day.toString()
              .padStart(2, '0')
          );
          setHours((prev) =>
            secondToDayHourMinSec(elapstedTimeDatePause)
              .hours.toString()
              .padStart(2, '0')
          );
          setMin(
            secondToDayHourMinSec(elapstedTimeDatePause)
              .minutes.toString()
              .padStart(2, '0')
          );
          setSec(
            secondToDayHourMinSec(elapstedTimeDatePause)
              .secondes.toString()
              .padStart(2, '0')
          );
        }
      }
    }
  }, [allUserTasks]);

  return (
    <div style={{ display: 'flex' }}>
      <Card Children={<p className='timerDigit'>{day}</p>} />
      <Card Children={<p className='timerDigit'>{hours}</p>} />
      <Card Children={<p className='timerDigit'>{min}</p>} />
      <Card Children={<p className='timerDigit'>{sec}</p>} />
    </div>
  );
};

export default Clock;
