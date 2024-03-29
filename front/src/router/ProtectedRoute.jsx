import React, { useContext } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import DialogConfirmSubmit from '../Components/DialogConfirmSubmit/DialogConfirmSubmit';
import DialogCreateTask from '../Components/DialogCreateTask/DialogCreateTask';
import DialogEditTask from '../Components/DialogEditTask/DialogEditTask';
import SideBar from '../Components/SideBar/SideBar';
import { AuthConext } from '../context/authContext';
import { ComponentContext } from '../context/componentContext';
import NavBar from './../Components/NavBar/NavBar';

export const ProtectedRoute = ({ children }) => {
  const { user } = useContext(AuthConext);
  const {
    sideBarOpen,
    dialogCreatTaskIsOpen,
    dialogEditTask,
    dialogConfirmSubmit,
  } = useContext(ComponentContext);

  if (!user) {
    return <Navigate to={'/login'} replace={true} />;
  }
  return (
    <>
      <NavBar />
      {sideBarOpen ? <SideBar /> : ''}
      {dialogCreatTaskIsOpen ? <DialogCreateTask /> : ''}
      {dialogEditTask ? <DialogEditTask /> : ''}
      {dialogConfirmSubmit ? <DialogConfirmSubmit /> : ''}
      {children ? children : <Outlet />}
    </>
  );
};
