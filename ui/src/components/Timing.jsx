import React, { useContext, useEffect, useRef, useState } from 'react';
import Card from './Card';
import '../style/Timing.scss';
import ProgressBar from './ProgressBar';
import FloatingButton from './FloatingButton';
import { useMutation, useQuery } from '@apollo/client';
import { GET_USER_TASK } from '../graphql/Query';
import { AuthContext } from '../context/authContext';
import { UPDATE_TASK } from '../graphql/Mutation';
import { setTaskStatePause, setTaskStatePlay } from '../graphql/tasks';
import { TaskContext } from '../context/taskContext';
import Clock from './Clock';

export default function Timing(props) {
  const userContext = useContext(AuthContext);
  const { setUserTaskPlay, setUserTaskPause } = useContext(TaskContext);
  const [curProcessTask, setCurProcessTask] = useState([]);
  const sub = userContext.user.sub;

  const refButton = useRef(null);

  const [updateTask, { error: errorOnUpdate }] = useMutation(UPDATE_TASK, {
    refetchQueries: [
      GET_USER_TASK,
      { variables: { input: { sub: userContext && sub } } },
    ],
    awaitRefetchQueries: true,
  });

  const {
    data: processingTask,
    error: errorLoadingProcessingTasks,
    loading: loadingProcess,
  } = useQuery(GET_USER_TASK, {
    variables: {
      input: {
        sub: useContext && sub,
      },
    },
  });

  useEffect(() => {
    if (processingTask && processingTask.getUserTask.length > 0) {
      const currentProcessTask = processingTask.getUserTask.filter(
        (item) => item.taskState === 'isPlay' || item.taskState === 'isPause'
      );
      currentProcessTask &&
        (setCurProcessTask(currentProcessTask[0]),
        setUserTaskPlay(currentProcessTask[0]));
    }
  }, [processingTask]);

  const handleClickButton = async (event) => {
    event.preventDefault();
    const buttonState = refButton.current.children[0].innerText;
    if (curProcessTask) {
      if (buttonState === 'pause') {
        console.log(curProcessTask.id);
        await setTaskStatePause(
          updateTask,
          curProcessTask.id,
          errorOnUpdate
        ).then(setUserTaskPause(curProcessTask));
      }
      if (buttonState === 'play_arrow') {
        await setTaskStatePlay(updateTask, curProcessTask.id, errorOnUpdate);
      }
    }
  };

  return (
    <div className='timing'>
      <div className='timing__elapsted'>
        <h4 className='timing__elapsted --l'>Elapsted</h4>
        <Clock/>
      </div>
      <hr className='timing__hr' />
      <div className='timing__actualProd'>
        <h4 className='timing__actualProd --l'>Actual Pro</h4>
        <div className='timing__actualProd --r progressbar'>
          <ProgressBar completed={60} />
        </div>
        <div className='timing__button' ref={refButton}>
          <FloatingButton
            icon={
              curProcessTask.taskState === 'isPlay' ? 'pause' : 'play_arrow'
            }
            handleClickButton={(e) => handleClickButton(e)}
          />
        </div>
      </div>
    </div>
  );
}
