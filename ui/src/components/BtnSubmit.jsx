import React, { useContext } from 'react';
import { componentContext } from '../context/componentContext';
import FloatingButton from './FloatingButton';

const BtnSubmit = () => {
  const ComponentContext = useContext(componentContext);

  const handleClickSubmit = (event) => {
    ComponentContext.openDialogConfirmSubmitTask();
    // console.log(event);
  };
  return (
    <div className='btnSubmit'>
      <FloatingButton icon={'done'} handleClickButton={handleClickSubmit} />
    </div>
  );
};

export default BtnSubmit;
