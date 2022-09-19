import { useQuery } from '@apollo/client';
import React from 'react';
import CircularBtn from '../CircularBtn/CircularBtn';
import ProcessingTaskPlayBtn from '../ProcessingTaskPlayBtn/ProcessingTaskPlayBtn';
import { ProcessingTaskCommandesCont } from './ProcessingTaskCommandes.styled';
import useGetProcessingTask from '../../assets/Hooks/useGetProcessingTask';
import Loading from '../Loading/Loading';
import ProcessingTaskPauseBtn from '../ProcessingTaskPauseBtn/ProcessingTaskPauseBtn';
import ProcessingTaskEditBtn from '../ProcessingTaskEditBtn/ProcessingTaskEditBtn';

const ProcessingTaskCommandes = () => {
  const { processingTask, loadingUserTask } = useGetProcessingTask();

  const taskState =
    processingTask.length > 0 &&
    processingTask.reduce((a, b) => a + b).taskState;

  if (loadingUserTask) {
    return <Loading />;
  }

  return (
    <ProcessingTaskCommandesCont>
      {taskState === 'isPlay' ? (
        <ProcessingTaskPauseBtn />
      ) : (
        <ProcessingTaskPlayBtn />
      )}
      <ProcessingTaskEditBtn />
      <CircularBtn icon='check_circle' />
    </ProcessingTaskCommandesCont>
  );
};

export default ProcessingTaskCommandes;
