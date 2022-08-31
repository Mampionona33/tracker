import { render } from '@testing-library/react';
import { screen } from '@testing-library/dom';
import React from 'react';
import Login from './Login';
import { GoogleOAuthProvider } from '@react-oauth/google';

test('should render login greeting', () => {
  render(
    <GoogleOAuthProvider>
      <Login />
    </GoogleOAuthProvider>
  );
  const greeting = screen.getByText('Welcome to mampionona task tracker');
  expect(greeting).toBeInTheDocument();
});
