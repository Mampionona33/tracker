import client from './apolloClient';
import { GET_USER } from './Query';

// This funtcion is used to get the user information
// from the data base. By using the sub key from
// the google login as variablse
const getUser = async (sub) =>
  await client.query({
    query: GET_USER,
    variables: {
      input: {
        sub: sub,
      },
    },
  });

export default getUser;
