import React, { lazy, useContext, useEffect } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import { ProtectedRoute } from './router/ProtectedRoute';
import { AuthConext } from './context/authContext';
import { createUser, getUser } from './Graphql/graphqlUser';
import { getTaskType } from './Graphql/graphqlTaskType';
import { TaskTypeContext } from './context/taskTypeContext';
import { useMutation, useQuery } from '@apollo/client';
const Dashboard = lazy(() => import('./Pages/Dashboard/Dashboard'));
const Login = lazy(() => import('./Pages/Login/Login'));
const PendingTask = lazy(() => import('./Pages/PendingTask/PendingTask'));
import { GET_USER, GET_ALL_TASK_TYPE } from './Graphql/Query';
import { CREATE_USER } from './Graphql/Mutation';

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

  const [createNewUser, { error: errorOnCreateUser }] =
    useMutation(CREATE_USER);

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
        if (Array.from(userExist.searchUser).length <= 0) {
          console.log('user not exist');
          if (mounted === true) {
            createUser(createNewUser, user, errorOnCreateUser);
          }
        } else {
          const userRole = userExist.searchUser[0].role;
          if (mounted === true) {
            userRole && setUserRole(userRole);
          }
        }
      }
      if (
        allTaskType &&
        Array.from(allTaskType.getAllTaskTypeList).length > 0
      ) {
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
