import React from 'react';
import {
  ProcessingTaskInfoContainer,
  ProcessingTaskTitleLabel,
  ProcessingTaskLabel,
  ProcessingTaskComment,
} from './ProcessingTaskInfo.style';

export default function ProcessingTaskInfo() {
  return (
    <ProcessingTaskInfoContainer>
      <ProcessingTaskTitleLabel>BOOT NUMBER</ProcessingTaskTitleLabel>
      <ProcessingTaskLabel>13213545</ProcessingTaskLabel>
      <ProcessingTaskTitleLabel>TASK TYPE</ProcessingTaskTitleLabel>
      <ProcessingTaskLabel>Contenu</ProcessingTaskLabel>
      <ProcessingTaskTitleLabel>STATUS COM</ProcessingTaskTitleLabel>
      <ProcessingTaskLabel>Essai</ProcessingTaskLabel>
      <ProcessingTaskTitleLabel>STATUS IVPN</ProcessingTaskTitleLabel>
      <ProcessingTaskLabel>I</ProcessingTaskLabel>
      <ProcessingTaskTitleLabel>CATEGORY</ProcessingTaskTitleLabel>
      <ProcessingTaskLabel>Interrupteurs et Relais</ProcessingTaskLabel>
      <ProcessingTaskTitleLabel>URL</ProcessingTaskTitleLabel>
      <ProcessingTaskLabel>
        <a href='https://mampionona-task-tracker.vercel.app' target='_blank'>
          https://mampionona-task-tracker.vercel.app
        </a>
      </ProcessingTaskLabel>
      <ProcessingTaskTitleLabel>NB BEFORE</ProcessingTaskTitleLabel>
      <ProcessingTaskLabel>0</ProcessingTaskLabel>
      <ProcessingTaskTitleLabel>NB AFTER</ProcessingTaskTitleLabel>
      <ProcessingTaskLabel>0</ProcessingTaskLabel>
      <ProcessingTaskTitleLabel>COMMENT</ProcessingTaskTitleLabel>
      <ProcessingTaskComment
        disabled
        defaultValue='no comment'
      ></ProcessingTaskComment>
    </ProcessingTaskInfoContainer>
  );
}
