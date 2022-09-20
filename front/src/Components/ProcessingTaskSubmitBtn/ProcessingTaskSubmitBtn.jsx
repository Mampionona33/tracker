import React, { useContext } from 'react';
import { ComponentContext } from '../../context/componentContext';
import CircularBtn from '../CircularBtn/CircularBtn';

const ProcessingTaskSubmitBtn = () => {
  const { dialogConfirmSubmit, setDialogConfirmSubmitOpen } =
    useContext(ComponentContext);
  const handleClick = (event) => {
    event.preventDefault();
    !dialogConfirmSubmit && setDialogConfirmSubmitOpen();
  };
  return (
    <div onClick={handleClick}>
      <CircularBtn icon='check_circle' />
    </div>
  );
};

export default ProcessingTaskSubmitBtn;
