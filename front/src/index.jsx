import React, { StrictMode, Suspense } from 'react';
import * as ReactDOM from 'react-dom/client';
import App from './App';
import { GoogleOAuthProvider } from '@react-oauth/google';
import { AuthProvider } from './context/authContext';
import { BrowserRouter } from 'react-router-dom';
import GlobalStyle from './GlobalStyle';
import './index.css';
import { ComponentProvider } from './context/componentContext';
import { ApolloProvider } from '@apollo/client';
import client from './Graphql/apolloClient';
import Loading from './Components/Loading/Loading';

const container = document.getElementById('root');
const root = ReactDOM.createRoot(container);

const clientId = process.env.REACT_APP_GOOGLE_CLIENT_ID;

root.render(
  <StrictMode>
    <BrowserRouter>
      <Suspense fallback={<Loading />}>
        <AuthProvider>
          <ComponentProvider>
            <GoogleOAuthProvider clientId={clientId}>
              <ApolloProvider client={client}>
                <GlobalStyle />
                <App />
              </ApolloProvider>
            </GoogleOAuthProvider>
          </ComponentProvider>
        </AuthProvider>
      </Suspense>
    </BrowserRouter>
  </StrictMode>
);
