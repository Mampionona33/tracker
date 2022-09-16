import React from 'react';
import useGetProcessingTask from '../../assets/Hooks/useGetProcessingTask';
import CircularBtn from '../CircularBtn/CircularBtn';
import { useMutation } from '@apollo/client';
import { UPDATE_TASK } from '../../Graphql/Mutation';
import { mutateTaskStateToPause } from '../../Graphql/graphqlTasks';
import { setCurrentTaskToPause } from '../../assets/taskStateSwitcher';
import Loading from './../Loading/Loading';

const ProcessingTaskPauseBtn = () => {
  const { processingTask } = useGetProcessingTask();
  const [
    updateTaskStateToPause,
    { error: errorOnSetTaskStateToPause, loading },
  ] = useMutation(UPDATE_TASK, {
    refetchQueries: 'active',
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
