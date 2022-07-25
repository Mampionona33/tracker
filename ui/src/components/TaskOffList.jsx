import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../context/authContext';
import { useMutation, useQuery } from '@apollo/client';
import {
  GET_TASK_BY_DATE,
  GET_TASK_BY_FILTER,
  GET_USER_TASK,
} from './../graphql/Query';
import FloatingButton from './FloatingButton';
import TableWithPagination from './TableWithPagination';
import { useNavigate, useParams } from 'react-router-dom';
import { UPDATE_TASK } from '../graphql/Mutation';
import { setTaskStateOff, setTaskStatePlay } from '../graphql/tasks';

const TaskOffList = () => {
  const userContext = useContext(AuthContext);
  const [userTaskOffList, setUserTaskOffList] = useState([]);
  const [taskPlay, setTaskPlay] = useState([]);
  const { date } = useParams();
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

  const { data: userTaskPlay, error: errorFetchUserTaskPlay } = useQuery(
    GET_TASK_BY_FILTER,
    {
      variables: {
        input: {
          taskState: 'isPlay',
          user: {
            sub: userContext && userContext.user.sub,
          },
        },
      },
    }
  );

  const [updateTask, { error: errorOnUpateTask }] = useMutation(UPDATE_TASK, {
    refetchQueries: [
      {
        query: GET_TASK_BY_FILTER,
        variables: {
          input: {
            taskState: 'isOff',
            user: {
              sub: userContext && userContext.user.sub,
            },
          },
        },
      },
      {
        query: GET_TASK_BY_FILTER,
        variables: {
          input: {
            taskState: 'isPlay',
            user: {
              sub: userContext && userContext.user.sub,
            },
          },
        },
      },
      {
        query: GET_TASK_BY_DATE,
        variables: {
          query: {
            date: date,
            sub: userContext && userContext.user.sub,
          },
        },
      },
    ],
    awaitRefetchQueries: true,
  });

  const onCLickPlayButton = async (event, id) => {
    event.preventDefault();
    if (taskPlay && taskPlay[0]) {
      await setTaskStateOff(
        updateTask,
        taskPlay[0].id,
        errorFetchUserTaskPlay
      ).then(setTaskStatePlay(updateTask, id, errorOnUpateTask));
    }
    setTaskStatePlay(updateTask, id, errorOnUpateTask);
  };

  useEffect(() => {
    if (userTaskOff) {
      setUserTaskOffList((prev) => userTaskOff.getUserTaskByFilter);
    }
    if (userTaskPlay) {
      setTaskPlay((prev) => userTaskPlay.getUserTaskByFilter);
    }
  }, [userTaskOff, userTaskPlay]);

  return (
    <>
      {userTaskOffList.length > 0 ? (
        <TableWithPagination columns={columns} data={userTaskOffList} />
      ) : (
        <h3>NO PENDING TASK</h3>
      )}
    </>
  );
};

export default TaskOffList;
