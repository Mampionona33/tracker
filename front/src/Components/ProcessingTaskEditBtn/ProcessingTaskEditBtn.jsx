import React, { useContext } from 'react';
import { ComponentContext } from '../../context/componentContext';
import CircularBtn from '../CircularBtn/CircularBtn';

function ProcessingTaskEditBtn() {
  const { dialogEditTask, setDialogEditTaskOpen } =
    useContext(ComponentContext);

  const handleClick = (event) => {
    event.preventDefault();
    setDialogEditTaskOpen();
  };
  return (
    <div onClick={handleClick}>
      <CircularBtn icon='edit' />
    </div>
  );
}

export default ProcessingTaskEditBtn;
