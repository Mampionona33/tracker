import React, { useContext, useEffect } from 'react';
import Login from './Pages/Login/Login';
import { Navigate, Route, Routes, useNavigate } from 'react-router-dom';
import { ProtectedRoute } from './router/ProtectedRoute';
import { AuthConext } from './context/authContext';
import Dashboard from './Pages/Dashboard/Dashboard';
import PendingTask from './Pages/PendingTask/PendingTask';
import { getUser } from './Graphql/graphqlUser';

const App = () => {
  const { user, sub } = useContext(AuthConext);

  useEffect(() => {
    let mouted = true;

    (async () => {
      if (user) {
        const userExist = await getUser(sub);
        if (mouted) {
          if (!userExist) {
            console.log('user not exist');
          }
          if (userExist) {
            console.log(userExist);
          }
        }
      }
    })();
  }, [user]);

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
