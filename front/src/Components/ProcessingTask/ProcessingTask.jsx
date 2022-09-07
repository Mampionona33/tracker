import React from 'react';
import styled from 'styled-components';
import ProcessingTaskCommandes from '../ProcessingTaskCommandes/ProcessingTaskCommandes';
import ProcessingTaskInfo from '../ProcessingTaskInfo/ProcessingTaskInfo';

export default function ProcessingTask() {
  const ProcessingTaskCont = styled.div`
    display: flex;
    flex-direction: column;
  `;
  const Spliter = styled.hr`
    width: 100%;
  `;
  return (
    <ProcessingTaskCont>
      <ProcessingTaskInfo />
      <Spliter />
      <ProcessingTaskCommandes />
    </ProcessingTaskCont>
  );
}
