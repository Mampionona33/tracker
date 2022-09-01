import React, { useContext } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { AuthConext } from '../context/authContext';

export const ProtectedRoute = ({ children }) => {
  const { user } = useContext(AuthConext);

  if (!user) {
    return <Navigate to={'/login'} replace={true} />;
  }
  return <>{children ? children : <Outlet />}</>;
};
