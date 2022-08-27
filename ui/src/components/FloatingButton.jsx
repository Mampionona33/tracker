import React from 'react';
import '../style/FloatingButton.scss';
import PropTypes from 'prop-types';

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

/*FloatingButton.propTypes = {
  icon: PropTypes.string,
  handleClickButton: PropTypes.function,
};*/

export default FloatingButton;
