import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../context/authContext';
import { useMutation, useQuery } from '@apollo/client';
import { GET_TASK_BY_FILTER, GET_USER_TASK } from './../graphql/Query';
import FloatingButton from './FloatingButton';
import TableWithPagination from './TableWithPagination';
import { UPDATE_TASK } from '../graphql/Mutation';
import { setTaskStateOff, setTaskStatePlay } from '../graphql/tasks';

const TaskOffList = () => {
  const userContext = useContext(AuthContext);
  const [processingTask, setProcessingTask] = useState({});

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
          <div style={{ maxWidth: '8rem', overflow: 'scrollchange' }}>
            <a
              href={data.url}
              target='_blank'
              style={{
                textDecoration: 'none',
                maxHeight: '1rem',
                display: 'block',
              }}
            >
              {data.url}
            </a>
          </div>
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
        taskState: 'isPlay' || 'isPause',
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

  const { data: allTasks, error: errorAllTasks } = useQuery(GET_USER_TASK, {
    variables: {
      input: {
        sub: userContext.user.sub,
      },
    },
  });

  useEffect(() => {
    if (allTasks && allTasks.getUserTask) {
      const userTaskPlay = Array.from(allTasks.getUserTask).filter(
        (item) => item.taskState === 'isPlay'
      );
      const userTaskPause = Array.from(allTasks.getUserTask).filter(
        (item) => item.taskState === 'isPause'
      );
      if (userTaskPlay.length > 0) {
        setProcessingTask(userTaskPlay[0]);
      }

      if (userTaskPause.length > 0) {
        setProcessingTask(userTaskPause[0]);
      }
    }
  }, [allTasks]);

  const onCLickPlayButton = (e, id) => {
    e.preventDefault();
    if (errorSetSelectedTaskPlay) {
      return errorSetSelectedTaskPlay;
    }
    if (processingTask && processingTask.id !== undefined) {
      const currentTaskId = processingTask.id;
      setTaskStateOff(
        setCurrentTaskOff,
        currentTaskId,
        errorSetCurrentTaskOff
      ).then(
        setTaskStatePlay(setSelectedTaskPlay, id, errorSetSelectedTaskPlay)
      );
    }
    setTaskStatePlay(setSelectedTaskPlay, id, errorSetSelectedTaskPlay);
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
