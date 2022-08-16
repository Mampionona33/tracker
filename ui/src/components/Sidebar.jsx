import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/authContext';
import '../style/Sidebar.scss';
import Modale from './Modale';

export default function Sidebar(props) {
  const navigate = useNavigate();
  const context = useContext(AuthContext);

  const handleClickItem = (event, target) => {
    event.preventDefault();
    navigate(target);
  };

  return (
    <div>
      <div className='sidebar'>
        <div
          className='sidebar__element'
          onClick={(ev) => handleClickItem(ev, '/dashboard')}
        >
          <span className='material-icons-round'>grid_view</span>
          <Link className='sidebar__element__link' to={'/dashboard'}>
            DASHBOARD
          </Link>
        </div>

        <div
          className='sidebar__element'
          onClick={(ev) => handleClickItem(ev, '/history')}
        >
          <span className='material-icons-round'>work_history</span>
          <Link className='sidebar__element__link' to={'/history'}>
            HISTORY
          </Link>
        </div>

        <div
          className='sidebar__element'
          onClick={(ev) => handleClickItem(ev, '/submited')}
        >
          <span class='material-icons-round'>checklist</span>
          <Link className='sidebar__element__link' to={'/submited'}>
            SUBMITED TASKS
          </Link>
        </div>

        {context.userRole === 'admin' && (
          <div className='sidebar__element'>
            <span className='material-icons-round'>admin_panel_settings</span>
            <Link className='sidebar__element__link' to={'/manage'}>
              MANAGE
            </Link>
          </div>
        )}
      </div>
      <Modale />
    </div>
  );
}
