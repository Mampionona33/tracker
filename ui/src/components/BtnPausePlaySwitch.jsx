import { useMutation, useQuery } from '@apollo/client';
import React, { useContext, useEffect, useRef, useState } from 'react';
import { AuthContext } from '../context/authContext';
import { TaskContext } from '../context/taskContext';
import { UPDATE_TASK } from '../graphql/Mutation';
import { GET_USER_TASK } from '../graphql/Query';
import { setTaskStatePause, setTaskStatePlay } from '../graphql/tasks';
import FloatingButton from './FloatingButton';

const BtnPausePlaySwitch = () => {
  const [iconButton, setIconButton] = useState('play_arrow');
  const userContext = useContext(AuthContext);
  const taskContext = useContext(TaskContext);
  const [currentProcessTask, setCurrentProcessTask] = useState([]);
  const [currentTaskSessionId, setCurrentTaskSessionId] = useState(null);
  const refButton = useRef(null);
  const { data: processingTask, error: errorLoadProcessingTask } = useQuery(
    GET_USER_TASK,
    {
      variables: { input: { sub: userContext.user.sub } },
    }
  );

  const [updateTask, { error: errorOnUpdateTask }] = useMutation(UPDATE_TASK, {
    refetchQueries: [
      {
        query: GET_USER_TASK,
        variables: {
          input: {
            sub: userContext.user.sub,
          },
        },
      },
    ],
    awaitRefetchQueries: true,
  });

  useEffect(() => {
    if (processingTask && processingTask.getUserTask) {
      const taskStatePlay = [...processingTask.getUserTask].filter(
        (item) => item.taskState === 'isPlay'
      );
      const taskStatePause = [...processingTask.getUserTask].filter(
        (item) => item.taskState === 'isPause'
      );
      if (taskStatePause && taskStatePause.length > 0) {
        setIconButton((prev) => 'play_arrow');
        setCurrentProcessTask((prev) => taskStatePause);

        setCurrentTaskSessionId((prev) =>
          taskStatePause
            .map((item) => {
              const session = item.session;
              if (session) {
                return [...session]
                  .map((elem) => elem.session_id)
                  .reduce((a, b) => Math.max(a, b));
              }
            })
            .reduce((a, b) => a + b)
        );
      }
      if (taskStatePlay && taskStatePlay.length > 0) {
        setIconButton((prev) => 'pause');

        setCurrentProcessTask((prev) => taskStatePlay);
        setCurrentTaskSessionId((prev) =>
          taskStatePlay
            .map((item) => {
              const session = item.session;
              if (session) {
                return [...session]
                  .map((elem) => elem.session_id)
                  .reduce((a, b) => Math.max(a, b));
              }
            })
            .reduce((a, b) => a + b)
        );
      }
    }
  }, [processingTask]);

  const handleClickButton = async (e) => {
    e.preventDefault();
    const buttonState = refButton.current.children[0].innerText;
    if (currentProcessTask.length > 0) {
      for (let i = 0; i < currentProcessTask.length; i++) {
        const id = currentProcessTask[i].id;

        if (buttonState === 'pause') {
          await setTaskStatePause(
            updateTask,
            id,
            errorOnUpdateTask,
            currentTaskSessionId
          );
        }
        if (buttonState === 'play_arrow') {
          await setTaskStatePlay(
            updateTask,
            id,
            errorOnUpdateTask,
            currentTaskSessionId
          );
        }
      }
    }
  };

  return (
    <div ref={refButton}>
      <FloatingButton
        icon={iconButton}
        handleClickButton={(e) => handleClickButton(e)}
      />
    </div>
  );
};

export default BtnPausePlaySwitch;
