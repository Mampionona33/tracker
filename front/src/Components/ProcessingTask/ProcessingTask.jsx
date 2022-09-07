import React from 'react';
import ProcessingTaskCommandes from '../ProcessingTaskCommandes/ProcessingTaskCommandes';
import ProcessingTaskInfo from '../ProcessingTaskInfo/ProcessingTaskInfo';
import { ProcessingTaskCont, Spliter } from './ProcessingTask.styled';

export default function ProcessingTask() {
  return (
    <ProcessingTaskCont>
      <ProcessingTaskInfo />
      <Spliter />
      <ProcessingTaskCommandes />
    </ProcessingTaskCont>
  );
}
