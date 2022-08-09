import React, { useContext } from 'react';
import { TaskTypeContext } from '../context/taskTypeContext';

const FormSimulation = () => {
  const taskTypeContext = useContext(TaskTypeContext);
  return (
    <div className='formSimulation__form'>
      <form action='' className='formSimulation__form'>
        <fieldset className='formSimulation__form__fieldset1'>
          <legend className='formSimulation__form__fieldset1__legend'>
            SIMULATION METHODES
          </legend>
          <div className='formSimulation__form__fieldset__radioGroupe'>
            <input
              type='radio'
              name='simulationMethode'
              id='by_elapsted_time'
              checked
            />
            <label htmlFor='by_elapsted_time'>BY ELAPSTED TIME</label>
          </div>
          <div className='formSimulation__form__fieldset__radioGroupe'>
            <input type='radio' name='simulationMethode' id='by_ending_time' />
            <label htmlFor='by_ending_time'>BY ENDING TIME</label>
          </div>
        </fieldset>
        <fieldset className='formSimulation__form__fieldset2'>
          <legend className='formSimulation__form__fieldset__legend'>
            BOOTH INFO
          </legend>
          <div className='formSimulation__form__fieldset__boothInfo'>
            <div className='formSimulation__form__row'>
              <label htmlFor='type' className='formSimulation__form__label'>
                TASK TYPE
              </label>
              <select
                name='type'
                id='type'
                className='formSimulation__form__input'
              >
                {taskTypeContext.taskType &&
                  Array.from(taskTypeContext.taskType).map((item) => {
                    return (
                      <option value={item.name} key={item.id}>
                        {item.name}
                      </option>
                    );
                  })}
              </select>
            </div>
          </div>
        </fieldset>
      </form>
    </div>
  );
};

export default FormSimulation;
