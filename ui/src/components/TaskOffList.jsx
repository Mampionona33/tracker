import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../context/authContext';
import { useQuery } from '@apollo/client';
import { GET_TASK_BY_FILTER } from './../graphql/Query';
import FloatingButton from './FloatingButton';
import TableWithPagination from './TableWithPagination';
import { useNavigate } from 'react-router-dom';

const TaskOffList = () => {
  const userContext = useContext(AuthContext);
  const [userTaskOffList, setUserTaskOffList] = useState([]);
  const navigate = useNavigate();

  const columns = [
    {
      Header: 'BoothNumber',
      accessor: 'boothNumber',
    },
    {
      Header: 'Task Type',
      accessor: 'type',
    },
    {
      Header: 'Task url',
      accessor: 'url',
    },
    {
      Header: 'Action',
      accessor: () => {
        return (
          <div
            className='actions'
            style={{ display: 'flex', justifyContent: 'center' }}
          >
            <FloatingButton icon={'play_arrow'} />
          </div>
        );
      },
    },
  ];

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

  

  return (
    <>
      {userTaskOffList.length > 0 && (
        <TableWithPagination columns={columns} data={userTaskOffList} />
      )}
    </>
  );
};

export default TaskOffList;
