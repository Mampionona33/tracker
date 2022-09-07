import React from 'react';
import CircularBtn from '../CircularBtn/CircularBtn';
import { ProcessingTaskCommandesCont } from './ProcessingTaskCommandes.styled';

const ProcessingTaskCommandes = () => {
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
