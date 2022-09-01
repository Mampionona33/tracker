import React, { useContext, useEffect } from 'react';
import Login from './Pages/Login/Login';
import { Navigate, Route, Routes, useNavigate } from 'react-router-dom';
import { ProtectedRoute } from './router/ProtectedRoute';
import { AuthConext } from './context/authContext';
import Dashboard from './Pages/Dashboard/Dashboard';

const App = () => {
  const { user } = useContext(AuthConext);
  console.log(user);
  return (
    <Routes>
      <Route
        path='/login'
        element={!user ? <Login /> : <Navigate to={'/dashboard'} />}
      />

      <Route
        path='/*'
        element={
          !user ? <Navigate to={'login'} /> : <Navigate to={'/dashboard'} />
        }
      />
      <Route element={<ProtectedRoute />}>
        <Route path='/dashboard' element={<Dashboard />} />
        <Route
          path='/'
          element={<Navigate to={'/dashboard'} replace={true} />}
        />
      </Route>
    </Routes>
  );
};

export default App;
