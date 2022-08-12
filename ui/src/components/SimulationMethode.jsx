import React, { useContext, useEffect, useState } from 'react';
import { SimulationContext } from '../context/simulationContext';
import '../style/SimulationMethode.scss';
const SimulationMethode = () => {
  const simulationContext = useContext(SimulationContext);
  const handleRadioChange = (event) => {
    simulationContext.setSimulationMethode(event.target.id);
  };

  return (
    <div className='simulationMethode'>
      <fieldset className='simulationMethode__fieldset'>
        <legend className='simulationMethode__fieldset__legende'>
          SIMULATION METHODE
        </legend>
        <form className='simulationMethode__fieldset__radioGroupe'>
          <div className='simulationMethode__fieldset__radioGroupe__1'>
            <input
              type='radio'
              name='simulationMethode'
              id='by_elapsted_time'
              value={simulationContext.simulationMethode}
              checked={
                simulationContext.simulationMethode === 'by_elapsted_time'
              }
              onChange={handleRadioChange}
            />
            <label htmlFor='by_elapsted_time'>BY ELAPSTED TIME</label>
          </div>
          <div className='simulationMethode__fieldset__radioGroupe__2'>
            <input
              type='radio'
              name='simulationMethode'
              id='by_ending_time'
              value={simulationContext.simulationMethode}
              onChange={handleRadioChange}
              checked={simulationContext.simulationMethode === 'by_ending_time'}
            />
            <label htmlFor='by_ending_time'>BY ENDING TIME</label>
          </div>
        </form>
      </fieldset>
    </div>
  );
};

export default SimulationMethode;
