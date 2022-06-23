import React, { useContext } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import { AuthContext } from '../context/authContext';
import { componentContext } from '../context/componentContext';
import Navbar from './../components/Navbar';

export default function ProtectedRoute({ children }) {
  const context = useContext(AuthContext);
  const ComponentContext = useContext(componentContext);

  if (!context.user) {
    return <Navigate to={'/login'} replace={true} />;
  }

  return (
    <>
      <Navbar />
      {ComponentContext.sideBar && <Sidebar />}
      {children ? children : <Outlet />}
    </>
  );
}
