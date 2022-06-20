import React from 'react';
import * as ReactDOM from 'react-dom/client';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import { GoogleOAuthProvider } from '@react-oauth/google';

const container = document.getElementById('root');
const root = ReactDOM.createRoot(container);

root.render(
  <GoogleOAuthProvider clientId={process.env.CLIENT_ID}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </GoogleOAuthProvider>
);
