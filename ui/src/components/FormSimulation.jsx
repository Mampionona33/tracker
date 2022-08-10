import React, { useContext } from 'react';
import { TaskTypeContext } from '../context/taskTypeContext';
import '../style/FormSimulation.scss';

const FormSimulation = () => {
  const taskTypeContext = useContext(TaskTypeContext);
  return (
    <div className='formSimulation__form'>
      <form action='' className='formSimulation__form'>
        <fieldset className='formSimulation__form__fieldset simulationMethode'>
          <legend className='formSimulation__form__fieldset__legend'>
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

        <fieldset className='formSimulation__form__fieldset'>
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

            {/* NUMBER BEFORE */}
            <div className='formSimulation__form__row'>
              <label htmlFor='nbBefore' className='formSimulation__form__label'>
                NB BEFORE
              </label>
              <input
                id='nbBefore'
                name='nbBefore'
                type='text'
                className='formSimulation__form__input'
              />
            </div>

            {/* NUMBER AFTER */}
            <div className='formSimulation__form__row'>
              <label htmlFor='nbAfter' className='formSimulation__form__label'>
                NB AFTER
              </label>
              <input
                id='nbAfter'
                name='nbAfter'
                type='text'
                className='formSimulation__form__input'
              />
            </div>

            <div className='formSimulation__form__row'>
              <label htmlFor='timer'>TIMER</label>
              <div className='formSimulation__form__timer'>
                <div className='formSimulation__form__timer__digit'>
                  <label htmlFor='day'>DAY</label>
                  <input
                    className='formSimulation__form__timer__digit__input'
                    type='number'
                    id='day'
                    name='day'
                  />
                </div>
                <div className='formSimulation__form__timer__digit'>
                  <label htmlFor='hours'>HOURS</label>
                  <input
                    className='formSimulation__form__timer__digit__input'
                    type='number'
                    id='hours'
                    name='hours'
                  />
                </div>
                <div className='formSimulation__form__timer__digit'>
                  <label htmlFor='minits'>MINITS</label>
                  <input
                    className='formSimulation__form__timer__digit__input'
                    type='number'
                    id='minits'
                    name='minits'
                  />
                </div>
                <div className='formSimulation__form__timer__digit'>
                  <label htmlFor='secondes'>SECONDES</label>
                  <input
                    className='formSimulation__form__timer__digit__input'
                    type='number'
                    id='secondes'
                    name='secondes'
                  />
                </div>
              </div>
            </div>

            <div className='formSimulation__form__row'></div>
          </div>
        </fieldset>
      </form>
    </div>
  );
};

export default FormSimulation;
