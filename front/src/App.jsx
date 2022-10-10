import React, { lazy, useContext, useEffect } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import { ProtectedRoute } from './router/ProtectedRoute';
import { AuthConext } from './context/authContext';
import { createUser } from './Graphql/graphqlUser';
import { TaskTypeContext } from './context/taskTypeContext';
import { useQuery } from '@apollo/client';
const Dashboard = lazy(() => import('./Pages/Dashboard/Dashboard'));
const Login = lazy(() => import('./Pages/Login/Login'));
const PendingTask = lazy(() => import('./Pages/PendingTask/PendingTask'));
import { GET_USER, GET_ALL_TASK_TYPE } from './Graphql/Query';
import History from './Pages/History/History';

const App = () => {
  const { user, sub, setUserRole } = useContext(AuthConext);
  const { setTaskTypeList } = useContext(TaskTypeContext);

  const {
    data: userExist,
    error: errorFetchingUser,
    loading: loadingFetchUser,
  } = useQuery(GET_USER, { variables: { input: { sub: sub } } });

  const {
    data: allTaskType,
    error: errorOnLoadTaskType,
    loading: loadingTaskType,
  } = useQuery(GET_ALL_TASK_TYPE);

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

    if (user) {
      if (userExist) {
        if ([...userExist.searchUser].length <= 0) {
          if (mounted === true) {
            (async () => {
              await createUser(user);
            })();
          }
        } else {
          const userRole = userExist.searchUser[0].role;
          if (mounted === true) {
            userRole && setUserRole(userRole);
          }
        }
      }
      if (allTaskType && [...allTaskType.getAllTaskTypeList].length > 0) {
        if (mounted === true) {
          setTaskTypeList(allTaskType.getAllTaskTypeList);
        }
      }
    }

    // clean up the async function on components unmount by returning mounted=false
    return () => {
      mounted = false;
    };
  }, [sub, user, userExist, allTaskType]);

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
        <Route path='history' element={<History />} />
        <Route
          path='/'
          element={<Navigate to={'/dashboard'} replace={true} />}
        />
      </Route>
    </Routes>
  );
};

export default App;
