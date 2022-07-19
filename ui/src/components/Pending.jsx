import { useQuery } from '@apollo/client';
import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../context/authContext';
import { GET_TASK_BY_FILTER } from '../graphql/Query';

export default function Pending() {
  const userContext = useContext(AuthContext);
  const [userTaskOffs, setUserTasksOff] = useState([]);

  const { data: userTaskOff, erro: errorFetchUserTaskOff } = useQuery(
    GET_TASK_BY_FILTER,
    {
      variables: {
        input: {
          taskState: 'isOff',
          user: {
            sub: userContext && userContext.user.sub,
          },
        },
      },
    }
  );

  useEffect(() => {
    if (userTaskOff) {
      console.log(userTaskOff.getUserTaskByFilter);
    }
  }, [userTaskOff]);

  return (
    <div className='pending'>
      <p>placeholder Pending </p>
    </div>
  );
}
