import { useQuery } from '@apollo/client';
import { useContext, useEffect, useState } from 'react';
import { AuthConext } from '../../context/authContext';
import { GET_USER_TASK } from '../../Graphql/Query';

const useGetPendingTask = () => {
  const [pendingTask, setPendingTask] = useState([]);
  const { sub } = useContext(AuthConext);
  const {
    data: userTask,
    error: errorFetchingUserTask,
    loading: loadingFetchUserTask,
  } = useQuery(GET_USER_TASK, {
    variables: {
      input: {
        sub: sub,
      },
    },
  });
  useEffect(() => {
    if (userTask && userTask.getUserTask) {
      const allUserTask = userTask.getUserTask;
      if (allUserTask.length > 0) {
        const pending = Array.from(allUserTask).filter(
          (task) => task.taskState === 'isOff'
        );
        pending.length > 0
          ? setPendingTask((prev) => pending)
          : setPendingTask((prev) => []);
      }
    }
  }, [userTask]);
  return { pendingTask, loadingFetchUserTask, errorFetchingUserTask };
};

export default useGetPendingTask;
