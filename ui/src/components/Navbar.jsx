import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../context/authContext';
import { componentContext } from '../context/componentContext';
import '../style/Navbar.scss';
export default function Navbar(props) {
  const context = useContext(AuthContext);
  const ComponentContext = useContext(componentContext);

  const handleClickMenu = (event) => {
    event.preventDefault();
    ComponentContext.toggleSideBar();
  };

  const handleClickLogout = async (event) => {
    event.preventDefault();
    context.logout();
  };

  return (
    <div className='navbar'>
      <div onClick={(ev) => handleClickMenu(ev)} className='navbar__menu'>
        {!ComponentContext.sideBar ? (
          <span className='material-icons-round'>menu</span>
        ) : (
          <span className='material-icons-round'>close</span>
        )}
      </div>

      <div className='navbar__logoutbtn' onClick={(e) => handleClickLogout(e)}>
        {context.user && (
          <img
            className='navbar__avatar'
            referrerPolicy='no-referrer' // add this to avoid erro 403 on downloading image from google
            src={context.user.picture}
            alt={context.user.given_name}
          />
        )}
        Logout
        <span className='material-icons-round'>logout</span>
      </div>
    </div>
  );
}
