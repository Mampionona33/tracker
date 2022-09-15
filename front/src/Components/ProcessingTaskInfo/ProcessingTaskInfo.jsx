import React from 'react';
import useGetProcessingTask from '../../assets/Hooks/useGetProcessingTask';
import Loading from '../Loading/Loading';
import {
  ProcessingTaskInfoContainer,
  ProcessingTaskTitleLabel,
  ProcessingTaskLabel,
  ProcessingTaskComment,
} from './ProcessingTaskInfo.style';

export default function ProcessingTaskInfo() {
  const { processingTask, loadingUserTask } = useGetProcessingTask();

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
