import React, { useContext, useEffect,lazy } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { AuthContext } from '../context/authContext';
import { componentContext } from '../context/componentContext';
import Navbar from './../components/Navbar';
import { getUser } from '../graphql/user';

const DialogConfirmSubmit = lazy(() => import('../components/DialogConfirmSubmit')) ;
const Sidebar = lazy(() => import('../components/Sidebar')) ;
const DialogNewTask =lazy(() => import('../components/DialogNewTask')) ;
const DialogEditProcessingTask = lazy(() => import('../components/DialogEditProcessingTask')) ;
const DialogEditHistory = lazy(() => import('../components/DialogEditHistory'));

export default function ProtectedRoute({ children }) {
  const context = useContext(AuthContext);
  const ComponentContext = useContext(componentContext);
  const currentUser = context.user;

  if (!context.user) {
    return <Navigate to={'/login'} replace={true} />;
  }

  useEffect(() => {
    let mounted = true;
    (async () => {
      if (currentUser) {
        const getUserData = await getUser(currentUser.sub);
        if (mounted) {
          console.log('mount');
          if (getUserData && getUserData.role) {
            context.setUserRole(getUserData.role);
          }
        }
      }
    })();
    // cleaning up on component unmount
    return () => (mounted = false);
  }, [currentUser]);

  return (
    <>
      <Navbar />
      {ComponentContext.dialogCreateTask && <DialogNewTask />}
      {ComponentContext.sideBar && <Sidebar />}
      {ComponentContext.dialogEditProcessingTask && (
        <DialogEditProcessingTask />
      )}
      {ComponentContext.dialogEditHistory && <DialogEditHistory />}
      {ComponentContext.dialogConfirmSubmit && <DialogConfirmSubmit />}
      {children ? children : <Outlet />}
    </>
  );
}
