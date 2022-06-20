import React from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import Login from './pages/Login';
import ProtectedRoute from './pages/ProtectedRoute';

export default function App() {
  return (
    <Routes>
      <Route path='/login' element={<Login />} />
      <Route element={<ProtectedRoute />}>
        <Route path='dashboard' element={<Dashboard />} />
      </Route>
    </Routes>
  );
}
