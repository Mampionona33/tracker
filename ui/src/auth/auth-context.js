import React, { createContext, useContext, useState } from 'react';
import {
  ApolloProvider,
  HttpLink,
  ApolloClient,
  InMemoryCache,
  gql,
} from '@apollo/client';

// follow this tuto https://lyonwj.com/blog/grandstack-podcast-app-next-js-graphql-authentication

const authContext = createContext();

export function AuthProvider({ children }) {
  const auth = useProviderAuth();

  return (
    <authContext.Provider value={auth}>
      <ApolloProvider client={auth.createApolloClient()}>
        {children}
      </ApolloProvider>
    </authContext.Provider>
  );
}

export const useAuth = () => {
  return useContext(authContext);
};

function useProviderAuth() {
  const [authToken, setAuthToken] = useState(null);

  const isSignedIn = () => {
    return authToken ? true : false;
  };

  const getAuthHeader = () => {
    if (!authToken) return null;
    return {
      authorization: `Bearer ${authToken}`,
    };
  };

  const createApolloClient = () => {
    const link = new HttpLink({
      uri: process.env.UI_API_ENDPOINT,
      headers: getAuthHeader(),
    });
    return new ApolloClient({
      link,
      cache: new InMemoryCache(),
    });
  };

  const signIn = async () => {
    const client = createApolloClient();
    const LoginMutation = gql`
      mutation signin($email: String!) {
        login(email: $email) {
          token
        }
      }
    `;

    const result = await client.mutate({
      mutation: LoginMutation,
      variables: { user: { email } },
    });

    console.log(result);

    if (result?.data?.login?.token) {
      setAuthToken(result.data.login.token);
    }
  };

  const sinOut = () => {
    setAuthToken(null);
  };

  return {
    setAuthToken,
    isSignedIn,
    signIn,
    sinOut,
    createApolloClient,
  };
}
