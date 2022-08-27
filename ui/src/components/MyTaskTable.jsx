import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../context/authContext';
import { useMutation, useQuery } from '@apollo/client';
import { GET_TASK_BY_FILTER, GET_USER_TASK } from './../graphql/Query';
import FloatingButton from './FloatingButton';
import TableWithPagination from './TableWithPagination';
import { UPDATE_TASK } from '../graphql/Mutation';
import {
  setCurrentTaskPauseToOff,
  setCurrentTaskPlayToOff,
  setTaskStatePlay,
} from '../graphql/tasks';
import Loading from './Loading';
import { useNavigate } from 'react-router-dom';

const MyTaskTable = () => {
  const userContext = useContext(AuthContext);
  const [processingTask, setProcessingTask] = useState({});
  const navigate = useNavigate();
  const [currentTaskSessionId, setCurrentTaskSessionId] = useState(null);

  const user = userContext.user;

  const columns = [
    {
      Header: 'BOOTH NUMBER',
      accessor: 'boothNumber',
    },
    {
      Header: 'TYPE',
      accessor: 'type',
    },
    {
      Header: 'URL',
      accessor: (data) => {
        return (
          <div style={{ maxWidth: '15rem', overflow: 'hidden' }}>
            <a href={data.url} target='_blank'>
              {data.url}
            </a>
          </div>
        );
      },
    },
    {
      Header: 'ELAPSTED TIME',
      accessor: (data) => {
        return (
          <>
            <p>placeholder elapsted time</p>
          </>
        );
      },
    },
    {
      Header: 'PRODUCTIVITY',
      accessor: (data) => {
        return (
          <>
            <p>placeholder PRODUCTIVITY</p>
          </>
        );
      },
    },

    {
      Header: 'Action',
      accessor: (data) => {
        // console.log('data', data);
        return (
          <div
            className='actions'
            style={{ display: 'flex', justifyContent: 'center' }}
            onClick={(event) => onCLickPlayButton(event, data)}
          >
            <FloatingButton
              icon={'play_arrow'}
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

  const {
    data: allTasks,
    error: errorAllTasks,
    loading: loadingAllTasks,
  } = useQuery(GET_USER_TASK, {
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

  const onCLickPlayButton = (e, data) => {
    e.preventDefault();
    if (errorSetSelectedTaskPlay) {
      return errorSetSelectedTaskPlay;
    }
    const clickedRowSessionId = Array.from(data.session)
      .map((item) => item.session_id)
      .reduce((a, b) => Math.max(a, b));
    if (
      Object.keys(processingTask).length > 0 &&
      processingTask.id !== undefined
    ) {
      const currentTaskId = processingTask.id;
      const currentProcessingTaskSessionId = Array.from(processingTask.session)
        .map((item) => item.session_id)
        .reduce((a, b) => Math.max(a, b));

      if (processingTask.taskState === 'isPlay') {
        setCurrentTaskPlayToOff(
          setCurrentTaskOff,
          currentTaskId,
          errorSetCurrentTaskOff,
          currentProcessingTaskSessionId
        ).then(
          setTaskStatePlay(
            setSelectedTaskPlay,
            data.id,
            errorSetSelectedTaskPlay,
            clickedRowSessionId
          )
        );
      }

      if (processingTask.taskState === 'isPause') {
        setCurrentTaskPauseToOff(
          setCurrentTaskOff,
          currentTaskId,
          errorSetCurrentTaskOff,
          currentProcessingTaskSessionId
        ).then(
          setTaskStatePlay(
            setSelectedTaskPlay,
            data.id,
            errorSetSelectedTaskPlay,
            clickedRowSessionId
          )
        );
      }
    }

    if (Object.keys(processingTask).length === 0) {
      setTaskStatePlay(
        setSelectedTaskPlay,
        data.id,
        errorSetSelectedTaskPlay,
        clickedRowSessionId
      );
    }
    navigate('/dashboard');
  };

  if (loadingAllTasks) {
    return <Loading />;
  }
  return (
    <div className='myTaskTable'>
      {taskOff && taskOff.getUserTaskByFilter.length > 0 ? (
        <TableWithPagination
          columns={columns}
          data={taskOff.getUserTaskByFilter}
        />
      ) : (
        <h3>NO PENDING TASK</h3>
      )}
    </div>
  );
};

export default MyTaskTable;
