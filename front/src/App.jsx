import React, { lazy, useContext, useEffect } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import { ProtectedRoute } from './router/ProtectedRoute';
import { AuthConext } from './context/authContext';
import { createUser, getUser } from './Graphql/graphqlUser';
import { getTaskType } from './Graphql/graphqlTaskType';
import { TaskTypeContext } from './context/taskTypeContext';
const Dashboard = lazy(() => import('./Pages/Dashboard/Dashboard'));
const Login = lazy(() => import('./Pages/Login/Login'));
const PendingTask = lazy(() => import('./Pages/PendingTask/PendingTask'));

const App = () => {
  const { user, sub, setUserRole } = useContext(AuthConext);
  const { setTaskTypeList } = useContext(TaskTypeContext);

  useEffect(() => {
    /*
      create  the variable mounted to cleaning up
      the async function. It prevent the double rendering
      of the component. 
      - on component mount set mounted value to true
      - on component unmount set the mounted value to false with return () => (mounted= false).
      when using StrictMode, the component is mount then unmount then mount. So we need to do
      this clean up when calling async in useEffect.
    */
    let mounted = true;

    (async () => {
      if (sub) {
        const userExist = await getUser(sub);
        const taskTypeLists = await getTaskType();

        if (mounted) {
          if (userExist) {
            if (userExist.role) {
              setUserRole(userExist.role);
            }
          } else {
            await createUser(user);
          }

          if (taskTypeLists) {
            setTaskTypeList(taskTypeLists);
          }
        }
      }
    })();

    // clean up the async function on components unmount by returning mounted=false
    return () => {
      mounted = false;
    };
  }, [sub, user]);

  return (
    <Routes>
      <Route
        path='/*'
        element={
          !user ? (
            <Navigate to={'/login'} />
          ) : (
            <Navigate to={'/dashboard'} replace={true} />
          )
        }
      />

      <Route
        path='/login'
        element={
          !user ? <Login /> : <Navigate to={'/dashboard'} replace={true} />
        }
      />

      <Route element={<ProtectedRoute />}>
        <Route path='/dashboard' element={<Dashboard />} />
        <Route path='pending_task' element={<PendingTask />} />
        <Route path='test' element={<div>test</div>} />
        <Route
          path='/'
          element={<Navigate to={'/dashboard'} replace={true} />}
        />
      </Route>
    </Routes>
  );
};

export default App;
