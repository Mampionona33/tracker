import React, { StrictMode } from 'react';
import * as ReactDOM from 'react-dom/client';
import App from './App';
import { GoogleOAuthProvider } from '@react-oauth/google';
import { AuthProvider } from './context/authContext';
import { BrowserRouter } from 'react-router-dom';
import GlobalStyle from './GlobalStyle';
import './index.css';
import { ComponentProvider } from './context/componentContext';

const container = document.getElementById('root');
const root = ReactDOM.createRoot(container);

const clientId = process.env.REACT_APP_GOOGLE_CLIENT_ID;

root.render(
  <StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <ComponentProvider>
          <GoogleOAuthProvider clientId={clientId}>
            <GlobalStyle />
            <App />
          </GoogleOAuthProvider>
        </ComponentProvider>
      </AuthProvider>
    </BrowserRouter>
  </StrictMode>
);
