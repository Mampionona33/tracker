import { useQuery } from '@apollo/client';
import React, { useContext, useEffect } from 'react';
import { AuthContext } from '../context/authContext';
import { GET_TASK_BY_DATE } from '../graphql/Query';
export default function History(props) {
  const userContext = useContext(AuthContext);

  const date = new Date();
  const dateNow = `2022-07-08`;
  const { data: taskByDate, error: errorFetchTaskByDate } = useQuery(
    GET_TASK_BY_DATE,
    {
      variables: {
        query: {
          date: dateNow,
          sub: userContext.user.sub,
        },
      },
    }
  );

  useEffect(() => {
    if (taskByDate) {
      console.log(taskByDate.getTaskByDate);
    }
  }, [taskByDate]);

  return (
    <>
      <div className='history'>Place holder history</div>
    </>
  );
}
