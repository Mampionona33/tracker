import { useMutation, useQuery } from '@apollo/client';
import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../context/authContext';
import { GET_USER_TASK } from '../graphql/Query';
import DialogTitle from './DialogTitle';
import Modale from './Modale';
import '../style/DialogConfirmSubmit.scss';
import { componentContext } from '../context/componentContext';
import { UPDATE_TASK } from '../graphql/Mutation';
import { TaskContext } from '../context/taskContext';
import {
  setTaskStatePauseDone,
  setTaskStatePlayDone,
} from './../graphql/tasks';

const DialogConfirmSubmit = () => {
  const userContext = useContext(AuthContext);
  const ComponentContext = useContext(componentContext);
  const taskContext = useContext(TaskContext);
  const [currentTask, setCurrentTask] = useState([]);
  const { data: userTask, error: errorFetchingUserTask } = useQuery(
    GET_USER_TASK,
    {
      variables: {
        input: {
          sub: userContext.user.sub,
        },
      },
    }
  );

  const [setTaskDone, { error: errorOnUpdateTaskState }] = useMutation(
    UPDATE_TASK,
    {
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
    }
  );

  useEffect(() => {
    if (userTask && userTask.getUserTask) {
      const processingTask = [...userTask.getUserTask].filter(
        (item) => item.taskState === 'isPlay' || item.taskState === 'isPause'
      );
      processingTask &&
        processingTask.length > 0 &&
        setCurrentTask((prev) => processingTask);
    }
  }, [userTask]);

  const handleClickCancel = (event) => {
    ComponentContext.closeDialogConfirmSubmitTask();
  };

  const handleClickSubmit = async (event) => {
    const taskStatePlay =
      currentTask.filter((item) => item.taskState === 'isPlay').length > 0
        ? currentTask.filter((item) => item.taskState === 'isPlay')
        : null;
    const taskStatePause =
      currentTask.filter((item) => item.taskState === 'isPause').length > 0
        ? currentTask.filter((item) => item.taskState === 'isPause')
        : null;

    if (taskStatePlay) {
      const currentSessionId = taskStatePlay
        .map((item) => item.session)
        .map((item) => {
          return Array.from(item).find((elem) => !elem.sessionStop).session_id;
        });

      await setTaskStatePlayDone(
        setTaskDone,
        currentTask[0].id,
        taskContext.productivity,
        taskContext.totalElapstedTime,
        ...currentSessionId,
        errorOnUpdateTaskState
      ).then(ComponentContext.closeDialogConfirmSubmitTask());
    }

    if (taskStatePause) {
      await setTaskStatePauseDone(
        setTaskDone,
        currentTask[0].id,
        taskContext.productivity,
        taskContext.totalElapstedTime,
        errorOnUpdateTaskState
      ).then(ComponentContext.closeDialogConfirmSubmitTask());
    }
  };

  return (
    <>
      <div className='dialogConfirmSubmit'>
        <div className='dialogConfirmSubmit__container'>
          <DialogTitle>CONFIRM TASK SUBMIT</DialogTitle>
          <div className='dialogConfirmSubmit__body'>
            <h4 className='dialogConfirmSubmit__message'>
              {currentTask.length > 0 &&
              currentTask.reduce((a, b) => a + b).boothNumber ? (
                <span className='material-icons-round'>info</span>
              ) : (
                <span className='material-icons-round'>error</span>
              )}
              DO YOU REALY WANT TO SUBMIT THIS TASK
              {currentTask.length > 0 &&
              currentTask.reduce((a, b) => a + b).boothNumber
                ? ` : ${currentTask.reduce((a, b) => a + b).boothNumber}`
                : 'WITHOUT ADDING A BOOTH NUMBER'}
            </h4>
            <div className='dialogConfirmSubmit__gourpBtn'>
              <button
                type='submit'
                onClick={handleClickSubmit}
                className='dialogConfirmSubmit__groupBtn__save saveButton'
              >
                CONFIRM
              </button>
              <button
                type='reset'
                onClick={handleClickCancel}
                className='dialogConfirmSubmit__groupBtn__cancel cancelButton'
              >
                CANCEL
              </button>
            </div>
          </div>
        </div>
      </div>
      <Modale />
    </>
  );
};

export default DialogConfirmSubmit;
