import React, { useContext } from 'react';
import CircularBtn from '../CircularBtn/CircularBtn';
import { useMutation } from '@apollo/client';
import useGetProcessingTask from '../../assets/Hooks/useGetProcessingTask';
import { mutateTaskStateToPlay } from '../../Graphql/graphqlTasks';
import { UPDATE_TASK } from '../../Graphql/Mutation';
import { setCurrentTaskToPlay } from '../../assets/taskStateSwitcher';
import Loading from '../Loading/Loading';
import { GET_USER_TASK } from '../../Graphql/Query';
import { AuthConext } from '../../context/authContext';

function ProcessingTaskPlayBtn() {
  const { sub } = useContext(AuthConext);
  const [
    updateTaskStateToPlay,
    { error: errorOnMutateTaskStateToPlay, loading },
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
      {loading ? (
        <Loading width='36px' height='36px' />
      ) : (
        <CircularBtn icon='play_circle_filled' />
      )}
    </div>
  );
}

export default ProcessingTaskPlayBtn;
