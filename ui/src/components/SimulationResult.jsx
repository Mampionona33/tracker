import React, { useContext ,lazy} from 'react';
import { SimulationContext } from '../context/simulationContext';

const ProgressBar = lazy(() => import('./ProgressBar')) ;

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
