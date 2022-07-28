import React from 'react';
import { Outlet } from 'react-router-dom';

export default function Pending() {
  return (
    <div className='pending'>
      <Outlet />
    </div>
  );
}
