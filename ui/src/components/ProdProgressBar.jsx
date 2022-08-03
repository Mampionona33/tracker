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

        if (typeTask) {
          const currentTypeTask = Array.from(taskTypeContext.taskType).filter(
            (item) => typeTask.test(item.name)
          );
          if (currentTypeTask && currentTypeTask.length > 0) {
            if (session.length > 0) {
              // console.log(currentTypeTask[0]);
              // console.log(processingTask[0].taskState);
              productivityGoal = currentTypeTask[0].goal;

              if (processingTask[0].taskState === 'isPause') {
                for (let i = 0; i < session.length; i++) {
                  elapstedTime.push(
                    difDate(session[i].sessionStart, session[i].sessionStop)
                  );
                }
              }
            }
          }
        }
      }
      if (elapstedTime.length > 0) {
        if (taskState === 'isPause') {
          const prod100 = productivityGoal / 3600;
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
      }
    }
  }, [allUserTask, taskTypeContext.taskType]);
  return (
    <div style={{ width: '12rem' }}>
      <ProgressBar completed={productivity} />
    </div>
  );
};

export default ProdProgressBar;
