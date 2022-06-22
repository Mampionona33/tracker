import React, { useContext } from 'react';
import { AuthContext } from '../context/authContext';

export default function Navbar(props) {
  const context = useContext(AuthContext);

  return (
    <>
      <button onClick={() => context.logout()}>logout</button>
    </>
  );
}
