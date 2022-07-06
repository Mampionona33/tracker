import {
  ApolloClient,
  createHttpLink,
  from,
  HttpLink,
  InMemoryCache,
} from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import { onError } from '@apollo/client/link/error';

const httpLink = createHttpLink({
  uri: process.env.UI_API_ENDPOINT,
});

const authLink = setContext((_, { headers }) => {
  return {
    headers: {
      ...headers,
      authorization: localStorage.getItem('token') || '',
    },
  };
});

const errorLink = onError(({ graphqlErrors, networkError }) => {
  if (graphqlErrors) {
    graphqlErrors.map(({ message, location, path }) => {
      alert(`Graphql errror ${message}`);
    });
  }
});

const link = from([
  errorLink,
  new HttpLink({ uri: process.env.UI_API_ENDPOINT }),
]);

const client = new ApolloClient({
  // link: authLink.concat(httpLink),
  link: link,
  cache: new InMemoryCache(),
});

export default client;
