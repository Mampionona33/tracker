import { useQuery } from '@apollo/client';
import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../context/authContext';
import { TaskTypeContext } from '../context/taskTypeContext';
import { GET_USER_TASK } from '../graphql/Query';
import '../style/SimulationBoothInfo.scss';

const SimulationBoothInfo = () => {
  const taskTypeContext = useContext(TaskTypeContext);
  const userContext = useContext(AuthContext);
  const [formState, setFormState] = useState({
    type: '',
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
    setFormState({ ...AuthContext, [ev.target.name]: ev.target.value });
  };

  return (
    <div className='simulationBoothInfo'>
      <form action='' className='simulationBoothInfo__form'>
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
              onChange={(ev) => handleInputChange(ev)}
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
          <div className='simulationBoothInfo__fieldset__row'>
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
          </div>
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
            />
          </div>
          <div className='simulationBoothInfo__fieldset__row'>
            <h4 className='simulationBoothInfo__fieldset__col1'>TIME</h4>
            <div className='simulationBoothInfo__fieldset__col2'>
              <div className='simulationBoothInfo__fieldset__col2__digitGroupe'>
                <div className='simulationBoothInfo__fieldset__col2__digit'>
                  <label htmlFor='day'>DAY</label>
                  <input
                    id='day'
                    name='day'
                    className='simulationBoothInfo__fieldset__col2__digit__inp'
                    type='number'
                    pattern='[0-9]{0,5}'
                  />
                </div>
                <div className='simulationBoothInfo__fieldset__col2__digit'>
                  <label htmlFor='hrs'>HRS</label>
                  <input
                    id='hrs'
                    pattern='[0-9]{0,5}'
                    name='hrs'
                    className='simulationBoothInfo__fieldset__col2__digit__inp'
                    type='number'
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
                  />
                </div>
                <div className='simulationBoothInfo__fieldset__col2__digit'>
                  <label htmlFor='sec'>SEC</label>
                  <input
                    pattern='[0-9]{0,5}'
                    id='sec'
                    name='sec'
                    className='simulationBoothInfo__fieldset__col2__digit__inp'
                    type='number'
                  />
                </div>
              </div>
            </div>
          </div>
        </fieldset>
      </form>
    </div>
  );
};

export default SimulationBoothInfo;