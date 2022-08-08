import { useQuery } from '@apollo/client';
import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../context/authContext';
import { TaskTypeContext } from '../context/taskTypeContext';
import { GET_USER_TASK } from '../graphql/Query';
import ProgressBar from './ProgressBar';
import { difDate } from './../assets/img/timeUtility';

const ProdProgressBar = () => {
  const taskTypeContext = useContext(TaskTypeContext);
  const userContext = useContext(AuthContext);
  const { data: allUserTask, error: errorOnLoadingAllUserTask } = useQuery(
    GET_USER_TASK,
    {
      variables: {
        input: {
          sub: userContext.user.sub,
        },
      },
    }
  );
  const [productivity, setProductivity] = useState(0);
  useEffect(() => {
    if (allUserTask && allUserTask.getUserTask && taskTypeContext.taskType) {
      const elapstedTime = [];
      let productivityGoal = 0;
      let nbProdAfter = 0;
      let taskState = 'isPause';
      const processingTask = Array.from(allUserTask.getUserTask).filter(
        (item) => item.taskState === 'isPause' || item.taskState === 'isPlay'
      );
      if (processingTask.length > 0) {
        const typeTask = new RegExp(
          '^' + `${processingTask[0].type}` + '$',
          'i'
        );
        const session = Array.from(processingTask[0].session);
        nbProdAfter = processingTask[0].nbAfter;
        taskState = processingTask[0].taskState;
        // console.log(processingTask);

        if (typeTask) {
          const currentTypeTask = Array.from(taskTypeContext.taskType).filter(
            (item) => typeTask.test(item.name)
          );
          if (currentTypeTask && currentTypeTask.length > 0) {
            if (session.length > 0) {
              productivityGoal = currentTypeTask[0].goal;
              for (let i = 0; i < session.length; i++) {
                const sessionStart = session[i].sessionStart;
                const sessionStop = session[i].sessionStop;
                const dif = sessionStop && difDate(sessionStart, sessionStop);
                elapstedTime.push(dif);
                !sessionStop &&
                  elapstedTime.push(
                    difDate(sessionStart, new Date().toISOString())
                  );
              }
            }
          }
        }
      }
      // Check if there is a processing task
      if (elapstedTime.length > 0) {
        const prod100 = productivityGoal / 3600;
        if (taskState === 'isPause') {
          const currentProd =
            nbProdAfter / elapstedTime.reduce((a, b) => a + b);
          const curTaskProd = Math.round((currentProd * 100) / prod100);
          if (curTaskProd <= 0) {
            setProductivity((prev) => 0);
          }
          if (curTaskProd <= 100) {
            setProductivity((prev) => curTaskProd);
          }
          if (curTaskProd > 100) {
            setProductivity((prev) => 100);
          }
        }
        if (taskState === 'isPlay') {
          const interval = setInterval(() => {
            elapstedTime.push(1);
            const currentProd =
              nbProdAfter / elapstedTime.reduce((a, b) => a + b);
            const curTaskProd = Math.round((currentProd * 100) / prod100);

            if (curTaskProd <= 0) {
              setProductivity((prev) => 0);
            }
            if (curTaskProd <= 100) {
              setProductivity((prev) =>
                Math.round((currentProd * 100) / prod100)
              );
            }
            if (curTaskProd > 100) {
              setProductivity((prev) => 100);
            }
          }, [1000]);
          return () => clearInterval(interval);
        }
      }
    }
  }, [allUserTask, taskTypeContext.taskType]);
  return (
    <div style={{ width: '10rem' }}>
      <ProgressBar completed={productivity} />
    </div>
  );
};

export default ProdProgressBar;
