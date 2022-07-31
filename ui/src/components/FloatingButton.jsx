import React from 'react';
import '../style/FloatingButton.scss';

const FloatingButton = (props) => {
  const { icon, handleClickButton } = props;
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
