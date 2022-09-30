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
    refetch: refetchUserTasks,
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
      if ([...allUserTask].length > 0) {
        const processing = [...allUserTask].filter(
          (task) => task.taskState === 'isPlay' || task.taskState === 'isPause'
        );

        processing.length > 0
          ? setProcessingTask((prev) => processing)
          : setProcessingTask((prev) => []);
      }
    }
  }, [userTasks]);

  return { processingTask, loadingUserTask, refetchUserTasks };
};

export default useGetProcessingTask;
