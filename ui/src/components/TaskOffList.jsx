import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../context/authContext';
import { useQuery } from '@apollo/client';
import { GET_TASK_BY_FILTER } from './../graphql/Query';
import FloatingButton from './FloatingButton';

const TaskOffList = () => {
  const userContext = useContext(AuthContext);
  const [userTaskOffList, setUserTaskOffList] = useState([]);

  const { data: userTaskOff, error: errorFetchUserTaskoff } = useQuery(
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
      setUserTaskOffList((prev) => userTaskOff.getUserTaskByFilter);
    }
  }, [userTaskOff]);

  const taskOffLi = userTaskOffList.map((item) => {
    return (
      <>
        <div
          className='taskOff__list'
          style={{
            display: 'grid',
            gridTemplateColumns: 'auto auto auto auto',
            columnGap: '1rem',
          }}
          key={item.id}
        >
          <p>{item.boothNumber}</p>
          <p>{item.type}</p>
          <a
            href={item.url}
            target='_blank'
            style={{
              textDecoration: 'none',
              display: 'flex',
              alignItems: 'center',
            }}
          >
            {item.url}
          </a>
          <div>
            <FloatingButton icon={'play_arrow'} />
          </div>
        </div>
        <hr />
      </>
    );
  });

  return (
    <div style={{ paddingTop: '0.5vh' }}>
      {userTaskOffList.length > 0 && taskOffLi}
    </div>
  );
};

export default TaskOffList;
