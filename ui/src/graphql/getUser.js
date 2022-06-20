import { ApolloClient, gql, InMemoryCache } from '@apollo/client';

const client = new ApolloClient({
  uri: process.env.UI_API_ENDPOINT || 'http://localhost:3000/graphql',
  cache: new InMemoryCache(),
});

const GET_USER = gql`
  query SearchUsers($input: FilterUser) {
    searchUsers(input: $input) {
      name
      uid
      email
      picture
      loggedIn
    }
  }
`;

const GET_LIST_USER = gql`
  query SearchUsers {
    listUsers {
      name
      username
      uid
      loggedIn
    }
  }
`;

export const queryUser = (userUid) => {
  query: GET_USER;
  fetchPolicy: 'no-cache';
  variables: {
    input: {
      uid: userUid;
    }
  }
};

const listUser = () => {
  query: GET_LIST_USER;
};

const getUser = async (userUid) => await client.query(listUser());

export default getUser;
