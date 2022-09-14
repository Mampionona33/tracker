import { useQuery } from '@apollo/client';
import React, { useContext, useEffect, useState } from 'react';
import { AuthConext } from '../../context/authContext';
import { GET_USER_TASK } from '../../Graphql/Query';
import Loading from '../Loading/Loading';
import {
  ProcessingTaskInfoContainer,
  ProcessingTaskTitleLabel,
  ProcessingTaskLabel,
  ProcessingTaskComment,
} from './ProcessingTaskInfo.style';

export default function ProcessingTaskInfo() {
  const [processingTask, setProcessingTask] = useState([]);
  const { sub } = useContext(AuthConext);

  const {
    data: userTasks,
    error: errorFetchingUserTask,
    loading: loadingUserTask,
  } = useQuery(GET_USER_TASK, {
    variables: { input: { sub: sub } },
  });

  useEffect(() => {
    let isMounted = true;

    if (userTasks) {
      if (isMounted) {
        const processing = Array.from(userTasks.getUserTask).filter(
          (item) => item.taskState === 'isPlay' || item.taskState === 'isPause'
        );
        processing.length > 0 && setProcessingTask((prev) => processing);
      }
    }

    return () => {
      isMounted = false;
    };
  }, [userTasks]);

  if (loadingUserTask) {
    return <Loading />;
  }

  return (
    <ProcessingTaskInfoContainer>
      <ProcessingTaskTitleLabel>BOOT NUMBER</ProcessingTaskTitleLabel>
      <ProcessingTaskLabel>
        {processingTask.length > 0 ? processingTask[0].boothNumber : ''}
      </ProcessingTaskLabel>
      <ProcessingTaskTitleLabel>TASK TYPE</ProcessingTaskTitleLabel>
      <ProcessingTaskLabel>
        {processingTask.length > 0 ? processingTask[0].type : ''}
      </ProcessingTaskLabel>
      <ProcessingTaskTitleLabel>STATUS COM</ProcessingTaskTitleLabel>
      <ProcessingTaskLabel>
        {processingTask.length > 0 ? processingTask[0].statCom : ''}
      </ProcessingTaskLabel>
      <ProcessingTaskTitleLabel>STATUS IVPN</ProcessingTaskTitleLabel>
      <ProcessingTaskLabel>
        {processingTask.length > 0 ? processingTask[0].ivpn : ''}
      </ProcessingTaskLabel>
      <ProcessingTaskTitleLabel>CATEGORY</ProcessingTaskTitleLabel>
      <ProcessingTaskLabel>
        {processingTask.length > 0 ? processingTask[0].cat : ''}
      </ProcessingTaskLabel>
      <ProcessingTaskTitleLabel>URL</ProcessingTaskTitleLabel>
      <ProcessingTaskLabel>
        <a
          href={processingTask.length > 0 ? processingTask[0].url : ''}
          target='_blank'
        >
          {processingTask.length > 0 ? processingTask[0].url : ''}
        </a>
      </ProcessingTaskLabel>
      <ProcessingTaskTitleLabel>NB BEFORE</ProcessingTaskTitleLabel>
      <ProcessingTaskLabel>
        {processingTask.length > 0 ? processingTask[0].nbBefore : ''}
      </ProcessingTaskLabel>
      <ProcessingTaskTitleLabel>NB AFTER</ProcessingTaskTitleLabel>
      <ProcessingTaskLabel>
        {processingTask.length > 0 ? processingTask[0].nbAfter : ''}
      </ProcessingTaskLabel>
      <ProcessingTaskTitleLabel>COMMENT</ProcessingTaskTitleLabel>
      <ProcessingTaskComment
        disabled
        defaultValue={
          processingTask.length > 0 ? processingTask[0].comment : ''
        }
      />
    </ProcessingTaskInfoContainer>
  );
}
