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
          const currentTypeTask = Array.from(taskTypeContext.taskType).filter(
            (item) => typeTask.test(item.name)
          );
          if (currentTypeTask && currentTypeTask.length > 0) {
            console.log(currentTypeTask[0].goal);
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
