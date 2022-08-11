import React from 'react';
import '../style/FormSimulation.scss';
import SimulationBoothInfo from './SimulationBoothInfo';
import SimulationMethode from './SimulationMethode';
import SimulationResult from './SimulationResult';

const FormSimulation = () => {
  return (
    <div className='formSimulation__form'>
      <div className='formSimulation__form'>
        <SimulationMethode />
        <SimulationBoothInfo />
        <SimulationResult />
      </div>
    </div>
  );
};

export default FormSimulation;
