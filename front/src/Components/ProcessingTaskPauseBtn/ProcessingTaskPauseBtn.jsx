import React, { useContext } from 'react';
import useGetProcessingTask from '../../assets/Hooks/useGetProcessingTask';
import CircularBtn from '../CircularBtn/CircularBtn';
import { useMutation } from '@apollo/client';
import { UPDATE_TASK } from '../../Graphql/Mutation';
import { mutateTaskStateToPause } from '../../Graphql/graphqlTasks';
import { setCurrentTaskToPause } from '../../assets/taskStateSwitcher';
import Loading from './../Loading/Loading';
import { GET_USER_TASK } from '../../Graphql/Query';
import { AuthConext } from '../../context/authContext';

const ProcessingTaskPauseBtn = () => {
  const { processingTask } = useGetProcessingTask();
  const { sub } = useContext(AuthConext);
  const [
    updateTaskStateToPause,
    { error: errorOnSetTaskStateToPause, loading },
  ] = useMutation(UPDATE_TASK, {
    refetchQueries: [
      {
        query: GET_USER_TASK,
        variables: {
          input: {
            sub: sub,
          },
        },
      },
    ],
    awaitRefetchQueries: true,
  });

  const handleClick = (event) => {
    event.preventDefault();
    setCurrentTaskToPause(
      processingTask,
      errorOnSetTaskStateToPause,
      mutateTaskStateToPause,
      updateTaskStateToPause
    );
  };

  return (
    <div onClick={handleClick}>
      {loading ? (
        <Loading height='36px' width='36px' />
      ) : (
        <CircularBtn icon='pause_circle' />
      )}
    </div>
  );
};

export default ProcessingTaskPauseBtn;
