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

export const queryUser = (userUid) => {
  query: GET_USER;
  variables: {
    input: {
      uid: userUid;
    }
  }
};

const getUser = async (userUid) => client.query(queryUser(userUid));

export default getUser;
