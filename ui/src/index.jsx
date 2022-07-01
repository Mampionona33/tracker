import React, { StrictMode } from 'react';
import * as ReactDOM from 'react-dom/client';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import { GoogleOAuthProvider } from '@react-oauth/google';
import { ApolloProvider } from '@apollo/client';
import client from './graphql/apolloClient';
import { AuthProvider } from './context/authContext';
import './style/index.scss';
import { ComponentProvider } from './context/componentContext';
import { TaskProvider } from './context/taskContext';
const container = document.getElementById('root');
const root = ReactDOM.createRoot(container);

root.render(
  <StrictMode>
    <AuthProvider>
      <ComponentProvider>
        <TaskProvider>
          <GoogleOAuthProvider
            clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}
          >
            <ApolloProvider client={client}>
              <BrowserRouter>
                <App />
              </BrowserRouter>
            </ApolloProvider>
          </GoogleOAuthProvider>
        </TaskProvider>
      </ComponentProvider>
    </AuthProvider>
  </StrictMode>
);
