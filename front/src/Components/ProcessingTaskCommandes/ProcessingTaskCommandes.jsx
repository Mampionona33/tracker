import { useQuery } from '@apollo/client';
import React from 'react';
import CircularBtn from '../CircularBtn/CircularBtn';
import ProcessingTaskPlayBtn from '../ProcessingTaskPlayBtn/ProcessingTaskPlayBtn';
import { ProcessingTaskCommandesCont } from './ProcessingTaskCommandes.styled';

const ProcessingTaskCommandes = () => {
  return (
    <ProcessingTaskCommandesCont>
      <CircularBtn icon='pause_circle' />
      <ProcessingTaskPlayBtn />
      <CircularBtn icon='edit' />
      <CircularBtn icon='check_circle' />
    </ProcessingTaskCommandesCont>
  );
};

export default ProcessingTaskCommandes;
