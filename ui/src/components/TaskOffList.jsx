import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../context/authContext';
import { useMutation, useQuery } from '@apollo/client';
import { GET_TASK_BY_FILTER, GET_USER_TASK } from './../graphql/Query';
import FloatingButton from './FloatingButton';
import TableWithPagination from './TableWithPagination';
import { useNavigate } from 'react-router-dom';
import { UPDATE_TASK } from '../graphql/Mutation';
import { setTaskStatePlay } from '../graphql/tasks';

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
      accessor: (data) => {
        return (
          <a href={data.url} target='_blank' style={{ textDecoration: 'none' }}>
            {data.url}
          </a>
        );
      },
    },
    {
      Header: 'Action',
      accessor: (data) => {
        return (
          <div
            className='actions'
            style={{ display: 'flex', justifyContent: 'center' }}
          >
            <FloatingButton
              icon={'play_arrow'}
              handleClickButton={(event) => onCLickPlayButton(event, data.id)}
            />
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

  const onCLickPlayButton = async (event, id) => {
    event.preventDefault();
    await setTaskStatePlay(updateTask, id, errorOnUpateTask);
  };

  const [updateTask, { error: errorOnUpateTask }] = useMutation(UPDATE_TASK, {
    refetchQueries: [
      GET_USER_TASK,
      {
        variables: {
          input: {
            sub: userContext && userContext.user.sub,
          },
        },
      },
      GET_TASK_BY_FILTER,
    ],
  });

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
