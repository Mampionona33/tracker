import React from 'react';
import ProgressBar from '../ProgressBar/ProgressBar';
import { RealProdLabel, RealProductivityCont } from './RealProductivity.styled';

const RealProductivity = () => {
  return (
    <RealProductivityCont>
      <RealProdLabel>real productivity</RealProdLabel>
      <ProgressBar completed={50} />
    </RealProductivityCont>
  );
};

export default RealProductivity;
