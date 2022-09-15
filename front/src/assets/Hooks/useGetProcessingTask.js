import { useQuery } from '@apollo/client';
import { useContext, useEffect, useState } from 'react';
import { AuthConext } from '../../context/authContext';
import { GET_USER_TASK } from '../../Graphql/Query';

const useGetProcessingTask = () => {
  const [processingTask, setProcessingTask] = useState([]);
  const { sub } = useContext(AuthConext);
  const {
    data: userTasks,
    error: errorOnFetchingUserTasks,
    loading: loadingUserTask,
  } = useQuery(GET_USER_TASK, {
    variables: {
      input: {
        sub: sub,
      },
    },
  });

  useEffect(() => {
    if (userTasks && userTasks.getUserTask) {
      const allUserTask = userTasks.getUserTask;
      if (Array.from(allUserTask).length > 0) {
        const processing = Array.from(allUserTask).filter(
          (task) => task.taskState === 'isPlay' || task.taskState === 'isPause'
        );
        processing.length > 0 && setProcessingTask((prev) => processing);
      }
    }
  }, [userTasks]);

  return { processingTask, loadingUserTask };
};

export default useGetProcessingTask;
