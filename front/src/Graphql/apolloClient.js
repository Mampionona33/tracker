import { ApolloClient, InMemoryCache } from '@apollo/client';

const client = new ApolloClient({
  uri: process.env.UI_API_ENDPOINT,
  cache: new InMemoryCache(),
});

console.log(process.env.UI_API_ENDPOINT);

export default client;
