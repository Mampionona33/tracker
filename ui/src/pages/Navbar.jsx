import React, { useContext } from 'react';
import { AuthContext } from '../context/authContext';
import '../style/Navbar.scss';
export default function Navbar(props) {
  const context = useContext(AuthContext);

  return (
    <div className='navbar'>
      <button onClick={() => context.logout()}>logout</button>
    </div>
  );
}
