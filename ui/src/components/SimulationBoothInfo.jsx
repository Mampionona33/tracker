import { useQuery } from '@apollo/client';
import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../context/authContext';
import { SimulationContext } from '../context/simulationContext';
import { TaskTypeContext } from '../context/taskTypeContext';
import { GET_USER_TASK } from '../graphql/Query';
import '../style/SimulationBoothInfo.scss';

const SimulationBoothInfo = () => {
  const taskTypeContext = useContext(TaskTypeContext);
  const simulationContext = useContext(SimulationContext);
  const userContext = useContext(AuthContext);
  const [formState, setFormState] = useState({
    type: '',
    nbAfter: '0',
    day: '00',
    hrs: '00',
    min: '00',
    sec: '00',
  });

  const {
    data: userTasks,
    error: errorFetchingUserTask,
    refetch,
  } = useQuery(GET_USER_TASK, {
    variables: { input: { sub: userContext.user.sub } },
  });

  useEffect(() => {
    if (userTasks && userTasks.getUserTask) {
      const curProcTask = Array.from(userTasks.getUserTask).filter(
        (item) => item.taskState === 'isPlay' || item.taskState === 'isPause'
      );
      if (curProcTask && curProcTask.length > 0) {
        setFormState({ ...formState, type: curProcTask[0].type });
      }
    }
  }, [userTasks]);

  const handleInputChange = (ev) => {
    ev.preventDefault();
    const name = ev.target.name;
    const value = ev.target.value;
    setFormState({ ...formState, [name]: value });

    switch (name) {
      case 'hrs':
        value > 23 || value < 0
          ? setFormState({
              ...formState,
              [name]: value.substring(0, value.length - 1),
            })
          : setFormState({ ...formState, [name]: value });
        break;
      case 'min':
        value < 0 || value > 59
          ? setFormState({
              ...formState,
              [name]: value.substring(0, value.length - 1),
            })
          : setFormState({ ...formState, [name]: value });
        break;
      case 'sec':
        value < 0 || value > 59
          ? setFormState({
              ...formState,
              [name]: value.substring(0, value.length - 1),
            })
          : setFormState({ ...formState, [name]: value });
        break;

      default:
        break;
    }
  };

  const handleOnBlur = (ev) => {
    ev.preventDefault();
    const name = ev.target.name;
    const value = ev.target.value;
    // formate timer input
    if (name === 'day' || name === 'hrs' || name === 'min' || name === 'sec') {
      if (value > 0) {
        setFormState({
          ...formState,
          [name]:
            parseInt(value) > 0
              ? parseInt(value).toString().padStart(2, '0')
              : '',
        });
      } else {
        setFormState({
          ...formState,
          [name]: '00',
        });
      }
    }
  };

  const handleClickReset = (ev) => {
    if (userTasks && userTasks.getUserTask) {
      const curProcTask = Array.from(userTasks.getUserTask).filter(
        (item) => item.taskState === 'isPlay' || item.taskState === 'isPause'
      );
      if (curProcTask && curProcTask.length > 0) {
        setFormState({
          ...formState,
          type: curProcTask[0].type,
          nbAfter: '0',
          day: '00',
          hrs: '00',
          min: '00',
          sec: '00',
        });
      }
      simulationContext.setSimulationMethode('by_elapsted_time');
    }
  };

  const handleFocus = (ev) => {
    const name = ev.target.name;
    const value = ev.target.value;
    setFormState({ ...formState, [name]: '' });
  };
  return (
    <div className='simulationBoothInfo'>
      <form className='simulationBoothInfo__form'>
        <fieldset className='simulationBoothInfo__fieldset'>
          <legend className='simulationBoothInfo__fieldset__legend'>
            BOOTH INFO
          </legend>
          <div className='simulationBoothInfo__fieldset__row'>
            <label
              htmlFor='type'
              className='simulationBoothInfo__fieldset__col1'
            >
              TASK TYPE
            </label>
            <select
              className='simulationBoothInfo__fieldset__col2'
              name='type'
              id='type'
              value={formState.type}
              onChange={handleInputChange}
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
          {/* <div className='simulationBoothInfo__fieldset__row'>
            <label
              htmlFor='nbBefore'
              className='simulationBoothInfo__fieldset__col1'
            >
              NB BEFORE
            </label>
            <input
              type='number'
              pattern='[0-9]{0,5}'
              id='nbBefore'
              name='nbBefore'
              className='simulationBoothInfo__fieldset__col2'
            />
          </div> */}
          <div className='simulationBoothInfo__fieldset__row'>
            <label
              htmlFor='nbAfter'
              className='simulationBoothInfo__fieldset__col1'
            >
              NB AFTER
            </label>
            <input
              type='number'
              pattern='[0-9]{0,5}'
              id='nbAfter'
              name='nbAfter'
              className='simulationBoothInfo__fieldset__col2'
              value={formState.nbAfter}
              onChange={handleInputChange}
              onFocus={handleFocus}
            />
          </div>
          <div className='simulationBoothInfo__fieldset__row'>
            <h4 className='simulationBoothInfo__fieldset__col1'>TIME</h4>
            <div className='simulationBoothInfo__fieldset__col2'>
              <div className='simulationBoothInfo__fieldset__col2__digitGroupe'>
                {simulationContext.methode === 'by_elapsted_time' && (
                  <div className='simulationBoothInfo__fieldset__col2__digit'>
                    <label htmlFor='day'>DAY</label>
                    <input
                      id='day'
                      name='day'
                      className='simulationBoothInfo__fieldset__col2__digit__inp'
                      type='number'
                      pattern='[0-9]{0,5}'
                      value={formState.day}
                      onChange={handleInputChange}
                      onBlur={handleOnBlur}
                      onFocus={handleFocus}
                    />
                  </div>
                )}
                <div className='simulationBoothInfo__fieldset__col2__digit'>
                  <label htmlFor='hrs'>HRS</label>
                  <input
                    id='hrs'
                    pattern='[0-9]{0,5}'
                    min={0}
                    max={23}
                    name='hrs'
                    className='simulationBoothInfo__fieldset__col2__digit__inp'
                    type='number'
                    value={formState.hrs}
                    onChange={(ev) => handleInputChange(ev)}
                    onBlur={handleOnBlur}
                    onFocus={handleFocus}
                  />
                </div>
                <div className='simulationBoothInfo__fieldset__col2__digit'>
                  <label htmlFor='min'>MIN</label>
                  <input
                    pattern='[0-9]{0,5}'
                    id='min'
                    name='min'
                    className='simulationBoothInfo__fieldset__col2__digit__inp'
                    type='number'
                    value={formState.min}
                    onChange={handleInputChange}
                    onBlur={handleOnBlur}
                    onFocus={handleFocus}
                  />
                </div>
                <div className='simulationBoothInfo__fieldset__col2__digit'>
                  <label htmlFor='sec'>SEC</label>
                  <input
                    pattern='[0-9]{0,5}'
                    id='sec'
                    name='sec'
                    min={0}
                    max={59}
                    className='simulationBoothInfo__fieldset__col2__digit__inp'
                    type='number'
                    value={formState.sec}
                    onChange={handleInputChange}
                    onBlur={handleOnBlur}
                    onFocus={handleFocus}
                  />
                </div>
              </div>
            </div>
          </div>
        </fieldset>
        <div className='simulationBoothInfo__buttons'>
          <button
            type='button'
            className='simulationBoothInfo__button'
            onClick={handleClickReset}
          >
            RESET
          </button>
        </div>
      </form>
    </div>
  );
};

export default SimulationBoothInfo;
