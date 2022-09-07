import React from 'react';
import styled from 'styled-components';
import ProcessingTaskInfo from '../../Components/ProcessingTask/ProcessingTaskInfo';
import TitledCard from '../../Components/TitledCard/TitledCard';

export default function Dashboard(props) {
  const DashboardContainer = styled.div`
    display: flex;
    justify-content: center;
    padding: 1rem;
    flex-wrap: wrap;
  `;

  const Spliter = styled.hr`
    width: 100%;
    border: 1px solid;
  `;
  return (
    <DashboardContainer>
      <TitledCard
        icon='engineering'
        iconBackGround='#3949AB'
        title='processing task'
      >
        <Spliter />
        <ProcessingTaskInfo />
      </TitledCard>
      <TitledCard
        icon='science'
        iconBackGround='#39A275'
        title='testing productivity'
      >
        TESTING
      </TitledCard>
    </DashboardContainer>
  );
}
