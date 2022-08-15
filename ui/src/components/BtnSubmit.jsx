import React from 'react';
import FloatingButton from './FloatingButton';

const BtnSubmit = () => {
  const handleClickSubmit = (event) => {
    console.log(event);
  };
  return (
    <div className='btnSubmit'>
      <FloatingButton icon={'done'} handleClickButton={handleClickSubmit} />
    </div>
  );
};

export default BtnSubmit;
