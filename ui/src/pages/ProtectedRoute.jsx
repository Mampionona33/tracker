import React, { useContext, useEffect } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import { AuthContext } from '../context/authContext';
import { componentContext } from '../context/componentContext';
import Navbar from './../components/Navbar';
import { getUser } from '../graphql/user';
import DialogNewTask from '../components/DialogNewTask';
import DialogEditProcessingTask from '../components/DialogEditProcessingTask';
import DialogConfirmSubmit from '../components/DialogConfirmSubmit';

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
      {ComponentContext.dialogConfirmSubmit && <DialogConfirmSubmit />}
      {children ? children : <Outlet />}
    </>
  );
}
