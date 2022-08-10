import React from 'react';
import '../style/SimulationMethode.scss';
const SimulationMethode = () => {
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
            />
            <label htmlFor='by_elapsted_time'>BY ELAPSTED TIME</label>
          </div>
          <div className='simulationMethode__fieldset__radioGroupe__2'>
            <input type='radio' name='simulationMethode' id='by_ending_time' />
            <label htmlFor='by_ending_time'>BY ENDING TIME</label>
          </div>
        </form>
      </fieldset>
    </div>
  );
};

export default SimulationMethode;
