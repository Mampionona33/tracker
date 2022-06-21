import React from 'react';
import * as ReactDOM from 'react-dom/client';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import { GoogleOAuthProvider } from '@react-oauth/google';
import { UserProvider } from './auth/auth-context';
import {
  ApolloClient,
  ApolloProvider,
  HttpLink,
  InMemoryCache,
  operationName,
} from '@apollo/client';

const container = document.getElementById('root');
const root = ReactDOM.createRoot(container);

const createApolloClient = () => {
  const link = new HttpLink({
    uri: process.env.UI_API_ENDPOINT,
  });
  return new ApolloClient({
    link,
    cache: new InMemoryCache(),
  });
};

root.render(
  <ApolloProvider client={createApolloClient()}>
    <UserProvider>
      <GoogleOAuthProvider clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </GoogleOAuthProvider>
    </UserProvider>
  </ApolloProvider>
);
