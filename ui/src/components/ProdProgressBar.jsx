import { useQuery } from '@apollo/client';
import React, { useContext, useEffect } from 'react';
import { AuthContext } from '../context/authContext';
import { TaskTypeContext } from '../context/taskTypeContext';
import { GET_USER_TASK } from '../graphql/Query';
import ProgressBar from './ProgressBar';

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
  useEffect(() => {
    if (allUserTask && allUserTask.getUserTask && taskTypeContext.taskType) {
      const processingTask = Array.from(allUserTask.getUserTask).filter(
        (item) => item.taskState === 'isPause' || item.taskState === 'isPlay'
      );
      if (processingTask.length > 0) {
        const typeTask = new RegExp(
          '^' + `${processingTask[0].type}` + '$',
          'i'
        );

        if (typeTask) {
          const taskTypeList = Array.from(taskTypeContext.taskType);
          for (let i = 0; i < taskTypeList.length; i++) {
            if (typeTask.test(taskTypeList[i].name)) {
              const productivityGoal = taskTypeList[i].goal;
              console.log(productivityGoal);
            }
          }
        }
      }
    }
  }, [allUserTask, taskTypeContext.taskType]);
  return (
    <div style={{ width: '12rem' }}>
      <ProgressBar completed={60} />
    </div>
  );
};

export default ProdProgressBar;
