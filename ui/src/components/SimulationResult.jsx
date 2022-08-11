import React from 'react';
import ProgressBar from './ProgressBar';

const SimulationResult = () => {
  return (
    <div className='simulationResult'>
      <fieldset>
        <legend>RESULT</legend>
        <ProgressBar completed={55}/>
      </fieldset>
    </div>
  );
};

export default SimulationResult;
