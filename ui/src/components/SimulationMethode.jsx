import { useQuery } from '@apollo/client';
import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../context/authContext';
import { SimulationContext } from '../context/simulationContext';
import { GET_USER_TASK } from '../graphql/Query';
import '../style/SimulationMethode.scss';
import Loading from './Loading';
const SimulationMethode = () => {
  const [currentTask, setCurrentTask] = useState([]);
  const simulationContext = useContext(SimulationContext);
  const userContext = useContext(AuthContext);
  const handleRadioChange = (event) => {
    simulationContext.setSimulationMethode(event.target.id);
  };

  const {
    data: userTasks,
    error: errorFetchingUserTasks,
    loading: loadingUserTasks,
  } = useQuery(GET_USER_TASK, {
    variables: { input: { sub: userContext.user.sub } },
  });

  useEffect(() => {
    if (userTasks && userTasks.getUserTask) {
      const processingTask = Array.from(userTasks.getUserTask).filter(
        (item) => item.taskState === 'isPlay' || item.taskState === 'isPause'
      );
      if (processingTask && processingTask.length > 0) {
        setCurrentTask((prev) => processingTask);
        simulationContext.setSimulationMethode('by_elapsted_time');
      }
    }
  }, [userTasks]);

  if (loadingUserTasks) {
    return <Loading />;
  }

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
              value={simulationContext.methode}
              checked={simulationContext.methode === 'by_elapsted_time'}
              onChange={handleRadioChange}
            />
            <label htmlFor='by_elapsted_time'>BY ELAPSTED TIME</label>
          </div>
          {currentTask.length > 0 &&
            currentTask.filter((item) => item.taskState === 'isPlay').length >
              0 && (
              <div className='simulationMethode__fieldset__radioGroupe__2'>
                <input
                  type='radio'
                  name='simulationMethode'
                  id='by_ending_time'
                  value={simulationContext.methode}
                  onChange={handleRadioChange}
                  checked={simulationContext.methode === 'by_ending_time'}
                />
                <label htmlFor='by_ending_time'>BY ENDING TIME</label>
              </div>
            )}
        </form>
      </fieldset>
    </div>
  );
};

export default SimulationMethode;
