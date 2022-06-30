import React, { useContext } from 'react';
import { componentContext } from '../context/componentContext';
import '../style/DialogNewTask.scss';

const DialogNewTask = () => {
  const ComponentContext = useContext(componentContext);

  const handleClickSave = (evnt) => {
    evnt.preventDefault();
    ComponentContext.toggleDialogCreateNewTask();
  };

  const handleClickCancel = (event) => {
    event.preventDefault();
    ComponentContext.toggleDialogCreateNewTask();
  };

  return (
    <div className='dialogNewTask'>
      <div className='dialogNewTask__container'>
        <p>placeholder for dialog new task</p>
        <div className='dialogNewTask__button'>
          <div
            className='dialogNewTask__button__save saveButton'
            onClick={(ev) => handleClickSave(ev)}
          >
            SAVE
          </div>
          <div className='dialogNewTask__button__cancel cancelButton' onClick={(ev)=>handleClickCancel(ev)}>
            CANCEL
          </div>
        </div>
      </div>
    </div>
  );
};

export default DialogNewTask;
