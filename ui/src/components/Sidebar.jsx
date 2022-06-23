import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../style/Sidebar.scss';

export default function Sidebar(props) {
  const navigate = useNavigate();

  return (
    <div className='sidebar'>
      <div className='sidebar__element' onClick={() => navigate('/dashboard')}>
        <span className='material-icons-round'>grid_view</span>
        <Link className='sidebar__element__link' to={'/dashboard'}>
          Dashboard
        </Link>
      </div>
      <div className='sidebar__element' onClick={() => navigate('/history')}>
        <span className='material-icons-round'>work_history</span>
        <Link className='sidebar__element__link' to={'/history'}>
          History
        </Link>
      </div>
    </div>
  );
}
