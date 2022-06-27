import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/authContext';
import '../style/Sidebar.scss';

export default function Sidebar(props) {
  const navigate = useNavigate();
  const context = useContext(AuthContext);

  const handleClickItem = (event, target) => {
    event.preventDefault();
    navigate(target);
  };

  return (
    <div className='sidebar'>
      <div
        className='sidebar__element'
        onClick={(ev) => handleClickItem(ev, '/dashboard')}
      >
        <span className='material-icons-round'>grid_view</span>
        <Link className='sidebar__element__link' to={'/dashboard'}>
          Dashboard
        </Link>
      </div>

      <div
        className='sidebar__element'
        onClick={(ev) => handleClickItem(ev, '/history')}
      >
        <span className='material-icons-round'>work_history</span>
        <Link className='sidebar__element__link' to={'/history'}>
          History
        </Link>
      </div>

      {context.userRole === 'admin' && (
        <div className='sidebar__element'>
          <span className='material-icons-round'>work_history</span>
          <Link className='sidebar__element__link' to={'/manage'}>
            Manage
          </Link>
        </div>
      )}
    </div>
  );
}
