import React from 'react';
import { Outlet } from 'react-router-dom';
import ManageNavBar from '../components/ManageNavBar';
import ManageTabContainer from '../components/ManageTabContainer';

export default function Manage() {
  return (
    <div className='manage'>
      <ManageNavBar />
      <ManageTabContainer />
    </div>
  );
}
