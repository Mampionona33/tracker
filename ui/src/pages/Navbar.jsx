import React, { useContext } from 'react';
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
        <span class='material-icons-round'>menu</span>
      </div>
      {context.user && (
        <img
          className='navbar__avatar'
          alt='userAvatar'
          src={context.user.picture}
        />
      )}

      <button onClick={() => context.logout()}>logout</button>
    </div>
  );
}
