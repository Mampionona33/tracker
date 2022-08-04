import React from 'react';
import '../style/FloatingButton.scss';

const FloatingButton = ({ icon, handleClickButton }) => {
  return (
    <span
      onClick={handleClickButton}
      className='material-icons-round md-35 fltHv'
    >
      {icon}
    </span>
  );
};

export default FloatingButton;
