import { useQuery } from '@apollo/client';
import React, { useContext, useEffect } from 'react';
import { AuthContext } from '../context/authContext';
import { GET_USER_TASK } from '../graphql/Query';

export default function SubmitedTaskTable() {
  const userContext = useContext(AuthContext);
  const {
    data: userTask,
    error: errorFetchingUserTask,
    loading: loadingUserTask,
  } = useQuery(GET_USER_TASK, {
    variables: {
      input: {
        sub: userContext.user.sub,
      },
    },
  });

  useEffect(() => {
    if (userTask && userTask.getUserTask) {
      const taskDoneList = Array.from(userTask.getUserTask).filter(
        (item) => item.taskState === 'isDone'
      );
      taskDoneList && taskDoneList.length > 0 && console.log(taskDoneList);
    }
  }, [userTask]);

  const columns = []

  return (
    <div style={{ height: 400, width: '100%' }}>
      <p>place holder sumbit task table</p>
    </div>
  );
}
