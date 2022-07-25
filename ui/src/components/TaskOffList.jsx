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

  const user = userContext.user;

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

  const {
    data: taskOff,
    erro: errorFetchTaskOff,
    loading: loadingTaskOff,
    refetch: refetchTaskOff,
  } = useQuery(GET_TASK_BY_FILTER, {
    variables: {
      input: {
        taskState: 'isOff',
        user: {
          sub: userContext && user.sub,
        },
      },
    },
  });

  const {
    data: currentTaskPlay,
    error: fetchCurrentTaskPlay,
    loading: loadingCurrentTaskPlay,
    refetch: refetchCurrentTaskPlay,
  } = useQuery(GET_TASK_BY_FILTER, {
    variables: {
      input: {
        taskState: 'isPlay',
        user: {
          sub: userContext && user.sub,
        },
      },
    },
  });

  const [setCurrentTaskOff, { error: errorSetCurrentTaskOff }] = useMutation(
    UPDATE_TASK,
    {
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
      ],
      fetchPolicy: 'network-only',
      awaitRefetchQueries: true,
    }
  );

  const [setSelectedTaskPlay, { error: errorSetSelectedTaskPlay }] =
    useMutation(UPDATE_TASK, {
      refetchQueries: [
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
      ],
      fetchPolicy: 'network-only',
      awaitRefetchQueries: true,
      onCompleted: () => {
        refetchTaskOff(), refetchCurrentTaskPlay();
      },
    });

  const onCLickPlayButton = (e, id) => {
    e.preventDefault();
    if (errorSetSelectedTaskPlay) {
      return errorSetSelectedTaskPlay;
    }
    if (currentTaskPlay) {
      if (currentTaskPlay.getUserTaskByFilter.length > 0) {
        const currentTaskId = currentTaskPlay.getUserTaskByFilter[0].id;

        setTaskStateOff(
          setCurrentTaskOff,
          currentTaskId,
          errorSetCurrentTaskOff
        ).then(
          setTaskStatePlay(setSelectedTaskPlay, id, errorSetSelectedTaskPlay)
        );
      }

      if (currentTaskPlay.getUserTaskByFilter.length <= 0) {
        setTaskStatePlay(setSelectedTaskPlay, id, errorSetSelectedTaskPlay);
      }
    }
    if (loadingTaskOff) {
      return loadingTaskOff;
    }
    if (loadingCurrentTaskPlay) {
      return loadingCurrentTaskPlay;
    }
  };

  return (
    <>
      {taskOff && taskOff.getUserTaskByFilter.length > 0 ? (
        <TableWithPagination
          columns={columns}
          data={taskOff.getUserTaskByFilter}
        />
      ) : (
        <h3>NO PENDING TASK</h3>
      )}
    </>
  );
};

export default TaskOffList;
