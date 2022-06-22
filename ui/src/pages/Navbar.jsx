import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../context/authContext';
import '../style/Navbar.scss';
export default function Navbar(props) {
  const context = useContext(AuthContext);

  const handleClickMenu = (event) => {
    event.preventDefault();
    alert('Menu clicked');
  };

  return (
    <div className='navbar'>
      <div onClick={(ev) => handleClickMenu(ev)} className='navbar__menu'>
        <span className='material-icons-round'>menu</span>
      </div>

      <div className='navbar__logoutbtn' onClick={() => context.logout()}>
        {context.user && (
          <img
            className='navbar__avatar'
            referrerPolicy='no-referrer' // add this to avoid erro 403 on downloading image from google
            src={context.user.picture}
          />
        )}
        Logout
        <span className='material-icons-round'>logout</span>
      </div>
    </div>
  );
}
