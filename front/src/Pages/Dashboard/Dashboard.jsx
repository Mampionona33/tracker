import React from 'react';
import styled from 'styled-components';
import TitledCard from '../../Components/TitledCard/TitledCard';

export default function Dashboard(props) {
  const DashboardContainer = styled.div`
    display: flex;
    justify-content: center;
    padding: 1rem;
  `;
  return (
    <DashboardContainer>
      <TitledCard
        icon='engineering'
        iconBackGround='#2c001e'
        title='processing task'
      >
        test
      </TitledCard>
      <TitledCard
        icon='science'
        iconBackGround='#772953'
        title='testing productivity'
      >
        TESTING
      </TitledCard>
    </DashboardContainer>
  );
}
