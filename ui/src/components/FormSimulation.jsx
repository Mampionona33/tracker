import React, { useContext } from 'react';
import { TaskTypeContext } from '../context/taskTypeContext';
import '../style/FormSimulation.scss';
import SimulationBoothInfo from './SimulationBoothInfo';
import SimulationMethode from './SimulationMethode';
import SimulationResult from './SimulationResult';

const FormSimulation = () => {
  const taskTypeContext = useContext(TaskTypeContext);
  return (
    <div className='formSimulation__form'>
      <form action='' className='formSimulation__form'>
        <SimulationMethode />
        <SimulationBoothInfo />
        <SimulationResult />
      </form>
    </div>
  );
};

export default FormSimulation;
