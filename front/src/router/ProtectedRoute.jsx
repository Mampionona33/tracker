import React, { useContext } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { AuthConext } from '../context/authContext';
import NavBar from './../Components/NavBar/NavBar';

export const ProtectedRoute = ({ children }) => {
  const { user } = useContext(AuthConext);

  if (!user) {
    return <Navigate to={'/login'} replace={true} />;
  }
  return (
    <>
      <NavBar />
      {children ? children : <Outlet />}
    </>
  );
};
