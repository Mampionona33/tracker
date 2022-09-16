import React from 'react';
import CircularBtn from '../CircularBtn/CircularBtn';
import { useMutation } from '@apollo/client';
import useGetProcessingTask from '../../assets/Hooks/useGetProcessingTask';
import { mutateTaskStateToPlay } from '../../Graphql/graphqlTasks';
import { UPDATE_TASK } from '../../Graphql/Mutation';
import { setCurrentTaskToPlay } from '../../assets/taskStateSwitcher';

function ProcessingTaskPlayBtn() {
  const [updateTaskStateToPlay, { error: errorOnMutateTaskStateToPlay }] =
    useMutation(UPDATE_TASK, { refetchQueries: 'all' });

  const { processingTask } = useGetProcessingTask();

  const handleClick = () => {
    setCurrentTaskToPlay(
      processingTask,
      errorOnMutateTaskStateToPlay,
      mutateTaskStateToPlay,
      updateTaskStateToPlay
    );
  };

  return (
    <div onClick={handleClick}>
      <CircularBtn icon='play_circle_filled' />
    </div>
  );
}

export default ProcessingTaskPlayBtn;
