import { render, screen } from '@testing-library/react';
import React, { useContext, useEffect } from 'react';
import Login from './Login';
import { GoogleOAuthProvider } from '@react-oauth/google';
import { expect } from '@jest/globals';
import { BrowserRouter, Route, Routes, useNavigate } from 'react-router-dom';
import { AuthConext } from '../../context/authContext';

test('should render greeting', () => {
  render(
    <GoogleOAuthProvider clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}>
      <BrowserRouter>
        <Routes>
          <Route path='/login' element={<Login />} />
          <Route path='/' element={<Login />} />
        </Routes>
      </BrowserRouter>
    </GoogleOAuthProvider>
  );
  const greeting = screen.getByText('Welcome to mampionona task tracker');
  expect(greeting).toBeInTheDocument();
});
