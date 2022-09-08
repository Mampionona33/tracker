import React, { lazy, Suspense, useContext, useEffect } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import { ProtectedRoute } from './router/ProtectedRoute';
import { AuthConext } from './context/authContext';
import { createUser, getUser } from './Graphql/graphqlUser';
import Loading from './Components/Loading/Loading';
const Dashboard = lazy(() => import('./Pages/Dashboard/Dashboard'));
const Login = lazy(() => import('./Pages/Login/Login'));
const PendingTask = lazy(() => import('./Pages/PendingTask/PendingTask'));

const App = () => {
  const { user, sub, setUserRole } = useContext(AuthConext);

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

        if (mounted) {
          if (userExist) {
            if (userExist.role) {
              setUserRole(userExist.role);
            }
          } else {
            await createUser(user);
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
          !user ? (
            <Suspense fallback={<Loading />}>
              <Login />
            </Suspense>
          ) : (
            <Navigate to={'/dashboard'} replace={true} />
          )
        }
      />

      <Route element={<ProtectedRoute />}>
        <Route
          path='/dashboard'
          element={
            <Suspense fallback={<Loading />}>
              <Dashboard />
            </Suspense>
          }
        />
        <Route
          path='pending_task'
          element={
            <Suspense fallback={<Loading />}>
              <PendingTask />
            </Suspense>
          }
        />
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
