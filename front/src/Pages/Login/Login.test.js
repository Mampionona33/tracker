import { render, screen } from '@testing-library/react';
import React from 'react';
import Login from './Login';
import { GoogleLogin, GoogleOAuthProvider } from '@react-oauth/google';
import { expect } from '@jest/globals';

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
    <GoogleOAuthProvider clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}>
      <GoogleLogin onSuccess={() => null} />
    </GoogleOAuthProvider>
  );
  const googleBtn = screen.getByTestId('google-loggin-btn');
});
