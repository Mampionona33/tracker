import { useQuery } from '@apollo/client';
import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../context/authContext';
import { GET_USER_TASK } from '../graphql/Query';
import DialogTitle from './DialogTitle';
import Modale from './Modale';
import '../style/DialogConfirmSubmit.scss';
import { componentContext } from '../context/componentContext';

const DialogConfirmSubmit = () => {
  const userContext = useContext(AuthContext);
  const ComponentContext = useContext(componentContext);
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

  useEffect(() => {
    if (userTask && userTask.getUserTask) {
      const processingTask = Array.from(userTask.getUserTask).filter(
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

  return (
    <>
      <div className='dialogConfirmSubmit'>
        <div className='dialogConfirmSubmit__container'>
          <DialogTitle>CONFIRM TASK SUBMIT</DialogTitle>
          <div className='dialogConfirmSubmit__body'>
            <h4 className='dialogConfirmSubmit__message'>
              {currentTask.length > 0 &&
              currentTask.reduce((a, b) => a + b).boothNumber ? (
                <span class='material-icons-round'>info</span>
              ) : (
                <span class='material-icons-round'>error</span>
              )}
              DO YOU REALY WHANT TO SUBMIT THIS TASK
              {currentTask.length > 0 &&
              currentTask.reduce((a, b) => a + b).boothNumber
                ? ` : ${currentTask.reduce((a, b) => a + b).boothNumber}`
                : 'WITHOUT ADDING A BOOTH NUMBER'}
            </h4>
            <div className='dialogConfirmSubmit__gourpBtn'>
              <button className='dialogConfirmSubmit__groupBtn__save saveButton'>
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
