import React, { useContext } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import { useAuthUser, UserContext } from './auth/auth-context';
import Dashboard from './pages/Dashboard';
import Login from './pages/Login';
import ProtectedRoute from './pages/ProtectedRoute';

export default function App() {
  const { user } = useContext(UserContext);

  console.log(user);

  return (
    <Routes>
      <Route path='/login' element={<Login />} />
      <Route element={<ProtectedRoute />}>
        <Route path='dashboard' element={<Dashboard />} />
      </Route>
    </Routes>
  );
}

/* 
ui .env files
ENABLE_HMR = true
UI_SERVER_PORT  = 8000
UI_API_ENDPOINT=http://localhost:3000/graphql
API_PROXY_TARGET=http://localhost:3000

GOOGLE_LOGGIN_TARGET = https://accounts.google.com

REACT_APP_AUTH0_DOMAIN = dev-4k9kw00s.eu.auth0.com
REACT_APP_AUTH0_CLIENT_ID = iNHhECtfsmhJf3d6aq6LHW2hdWIpNXmk

REACT_APP_GOOGLE_CLIENT_ID = 498868729809-sqv8at247oi30ldgt0se55j5397u71br.apps.googleusercontent.com

PRIVATE_KEY = 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

*/
