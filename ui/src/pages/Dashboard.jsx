import React, { useContext } from 'react';
import { AuthContext } from '../context/authContext';

export default function Dashboard() {
  const context = useContext(AuthContext);
  console.log(context.user);

  return (
    <>
      <div className='dashboard'>placeholder for dashboard</div>
    </>
  );
}
