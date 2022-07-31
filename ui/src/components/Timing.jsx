import React, { useContext, useEffect, useRef, useState } from 'react';
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
  const [buttonIcon, setButtonIcon] = useState('pause');
  const sub = userContext.user.sub;
  const taskContext = useContext(TaskContext);

  const refButton = useRef(null);

  const [updateTask, { error: errorOnUpdate }] = useMutation(UPDATE_TASK, {
    refetchQueries: [
      {
        query: GET_USER_TASK,
        variables: { input: { sub: userContext && sub } },
      },
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
    if (processingTask) {
      if (processingTask.getUserTask) {
        const taskStateArray = Array.from(processingTask.getUserTask);
        const taskStatePause = taskStateArray.filter(
          (item) => item.taskState === 'isPause'
        );
        const taskStatePlay = taskStateArray.filter(
          (item) => item.taskState === 'isPlay'
        );
        if (taskStatePause && taskStatePause.length > 0) {
          setButtonIcon((prev) => 'play_arrow');
          setCurProcessTask((prev) => taskStatePause);
        }
        if (taskStatePlay && taskStatePlay.length > 0) {
          setButtonIcon((prev) => 'pause');
          setCurProcessTask((prev) => taskStatePlay);
        }
      }
    }
  }, [processingTask]);

  const handleClickButton = async (event) => {
    event.preventDefault();
    const buttonState = refButton.current.children[0].innerText;

    if (curProcessTask.length > 0) {
      for (let i = 0; i < curProcessTask.length; i++) {
        const id = curProcessTask[i].id;
        if (buttonState === 'pause') {
          await setTaskStatePause(updateTask, id, errorOnUpdate);
        }
        if (buttonState === 'play_arrow') {
          await setTaskStatePlay(updateTask, id, errorOnUpdate);
        }
      }
    }
  };

  return (
    <div className='timing'>
      <div className='timing__elapsted'>
        <h4 className='timing__elapsted --l'>Elapsted</h4>
        <Clock />
      </div>
      <hr className='timing__hr' />
      <div className='timing__actualProd'>
        <h4 className='timing__actualProd --l'>Actual Pro</h4>
        <div className='timing__actualProd --r progressbar'>
          <ProgressBar completed={60} />
        </div>
        <div className='timing__button' ref={refButton}>
          <FloatingButton
            icon={buttonIcon}
            handleClickButton={(e) => handleClickButton(e)}
          />
        </div>
      </div>
    </div>
  );
}
