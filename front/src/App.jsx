import React, { useContext, useEffect } from 'react';
import Login from './Pages/Login/Login';
import { Navigate, Route, Routes, useNavigate } from 'react-router-dom';
import { ProtectedRoute } from './router/ProtectedRoute';
import { AuthConext } from './context/authContext';
import Dashboard from './Pages/Dashboard/Dashboard';
import PendingTask from './Pages/PendingTask/PendingTask';
import { createUser, getUser } from './Graphql/graphqlUser';

const App = () => {
  const { user, sub } = useContext(AuthConext);

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
            console.log(userExist);
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
