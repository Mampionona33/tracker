import React, { useContext } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import SideBar from '../Components/SideBar/SideBar';
import { AuthConext } from '../context/authContext';
import { ComponentContext } from '../context/componentContext';
import NavBar from './../Components/NavBar/NavBar';

export const ProtectedRoute = ({ children }) => {
  const { user } = useContext(AuthConext);
  const { sideBarOpen } = useContext(ComponentContext);

  if (!user) {
    return <Navigate to={'/login'} replace={true} />;
  }
  return (
    <>
      <NavBar />
      {sideBarOpen ? <SideBar /> : ''}
      {children ? children : <Outlet />}
    </>
  );
};
