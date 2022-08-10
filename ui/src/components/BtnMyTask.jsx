import React from 'react';
import { useNavigate } from 'react-router-dom';

const BtnMyTask = () => {
  const navigate = useNavigate();
  const handleClickMyTaskButton = (event) => {
    event.preventDefault();
    navigate('/mytasks/row_show=3', { replace: true });
  };

  return (
    <button
      type='button'
      className='navbar__btn'
      onClick={(e) => handleClickMyTaskButton(e)}
    >
      <span className='material-icons-round'>format_list_bulleted</span>
      MY TASKS
    </button>
  );
};

export default BtnMyTask;
