import { useMutation } from '@apollo/client';
import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthConext } from '../../context/authContext';
import {
  mutateCurrentTaskPauseOff,
  mutateCurrentTaskPlayOff,
  mutateTaskStateToPlay,
} from '../../Graphql/graphqlTasks';
import { UPDATE_TASK } from '../../Graphql/Mutation';
import { GET_USER_TASK } from '../../Graphql/Query';
import CircularBtn from '../CircularBtn/CircularBtn';
import useGetProcessingTask from './../../assets/Hooks/useGetProcessingTask';
import {
  setCurrentTaskStateToOff,
  setCurrentTaskToPlay,
} from './../../assets/taskStateSwitcher';

function PendingTaskPlayBtn({ clickedTask }) {
  const { processingTask } = useGetProcessingTask();
  const { sub } = useContext(AuthConext);
  const navigate = useNavigate();

  const [updateTaskState, { error: errorUpdateTaskState }] = useMutation(
    UPDATE_TASK,
    {
      refetchQueries: [
        { query: GET_USER_TASK, variables: { input: { sub: sub } } },
      ],
      awaitRefetchQueries: true,
    }
  );

  const handleClick = (event) => {
    console.log('taskId', clickedTask);

    if (processingTask.length > 0) {
      console.log(processingTask);
      setCurrentTaskStateToOff(
        processingTask,
        errorUpdateTaskState,
        mutateCurrentTaskPauseOff,
        mutateCurrentTaskPlayOff,
        updateTaskState
      ).then(
        setCurrentTaskToPlay(
          [clickedTask],
          errorUpdateTaskState,
          mutateTaskStateToPlay,
          updateTaskState
        ).then(navigate('dashboard', { replace: true }))
      );
    } else {
      console.log('no processing task');
      setCurrentTaskToPlay(
        [clickedTask],
        errorUpdateTaskState,
        mutateTaskStateToPlay,
        updateTaskState
      ).then(navigate('dashboard'));
    }
  };
  return (
    <div onClick={handleClick}>
      <CircularBtn icon='play_circle_filled' />
    </div>
  );
}

export default PendingTaskPlayBtn;
