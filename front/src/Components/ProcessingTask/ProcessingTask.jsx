import React from 'react';
import styled from 'styled-components';
import ProcessingTaskInfo from './ProcessingTaskInfo';

export default function ProcessingTask() {
  const ProcessingTaskCont = styled.div`
    display: flex;
  `;
  return (
    <ProcessingTaskCont>
      <ProcessingTaskInfo />
    </ProcessingTaskCont>
  );
}
