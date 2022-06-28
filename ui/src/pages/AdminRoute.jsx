import React, { useContext } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { AuthContext } from '../context/authContext';

export default function AdminRoute({ Children }) {
  const context = useContext(AuthContext);

  if (!context.user && context.userRole !== 'admin') {
    return <Navigate to={'/dashboard'} replace />;
  }

  return <div>{Children ? Children : <Outlet />}</div>;
}
