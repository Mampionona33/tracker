import React, { useContext } from 'react';
import { SimulationContext } from '../context/simulationContext';
import ProgressBar from './ProgressBar';

const SimulationResult = () => {
  const simulationContext = useContext(SimulationContext);
  return (
    <div className='simulationResult'>
      <fieldset style={{ borderRadius: '0.3rem' }}>
        <legend>RESULT</legend>
        <ProgressBar completed={simulationContext.result} />
      </fieldset>
    </div>
  );
};

export default SimulationResult;
