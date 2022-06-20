import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

export default function ProtectedRoute({ children }) {
  if (!isSignedIn) {
    return <Navigate to={'/login'} replace={true} />;
  }

  return <>{children ? children : <Outlet />}</>;
}
