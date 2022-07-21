import React from 'react';
import { Outlet } from 'react-router-dom';
import TaskOffList from './TaskOffList';

export default function Pending() {
  return (
    <div className='pending'>
      <Outlet />
    </div>
  );
}
