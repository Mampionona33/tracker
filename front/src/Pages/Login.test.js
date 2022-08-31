/** @jest-environment jsdom */
import { render } from '@testing-library/react';
import { screen } from '@testing-library/dom';
import '@testing-library/jest-dom/extend-expect';
import React from 'react';
import Login from './Login';
import { GoogleOAuthProvider } from '@react-oauth/google';

test('should render Login title', () => {
  render(
    <GoogleOAuthProvider>
      <Login />
    </GoogleOAuthProvider>
  );
  expect(screen.getByText('Welcome to mampionona task tracker')).toBeVisible();
});
