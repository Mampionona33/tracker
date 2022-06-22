import React, { useContext } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { AuthContext } from '../context/authContext';
import Navbar from './Navbar';

export default function ProtectedRoute({ children }) {
  const context = useContext(AuthContext);

  if (!context.user) {
    return <Navigate to={'/login'} replace={true} />;
  }

  return (
    <>
      <Navbar />
      {children ? children : <Outlet />}
    </>
  );
}
