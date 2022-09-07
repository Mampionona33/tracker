import React from 'react';
import styled from 'styled-components';
import CircularBtn from '../CircularBtn/CircularBtn';

const ProcessingTaskCommandes = () => {
  const ProcessingTaskCommandesCont = styled.div`
    display: flex;
    justify-content: flex-end;
    gap: 0.5rem;
  `;
  return (
    <ProcessingTaskCommandesCont>
      <CircularBtn icon='pause_circle' />
      <CircularBtn icon='play_circle_filled' />
      <CircularBtn icon='edit' />
      <CircularBtn icon='check_circle' />
    </ProcessingTaskCommandesCont>
  );
};

export default ProcessingTaskCommandes;
