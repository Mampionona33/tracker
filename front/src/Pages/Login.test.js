import { render, screen } from '@testing-library/react';
import React from 'react';
import Login from './Login';
import { GoogleOAuthProvider } from '@react-oauth/google';

test('should render greeting', () => {
  render(
    <GoogleOAuthProvider>
      <Login />
    </GoogleOAuthProvider>
  );
  const greeting = screen.getByText('Welcome to mampionona task tracker');
  expect(greeting).toBeInTheDocument();
});

test('should render GoogleLoggin button', () => {
  render(
    <GoogleOAuthProvider>
      <Login />
    </GoogleOAuthProvider>
  );
  const logginBtn = screen.queryAllByTestId('google-loggin-btn');
  expect(logginBtn).toBeInTheDocument();
});
