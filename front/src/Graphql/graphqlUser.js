import client from './apolloClient';
import { GET_USER } from './Query';

export const getUser = async (sub) => {
  const userData = await client.query({
    query: GET_USER,
    variables: {
      input: {
        sub: sub,
      },
    },
  });
  return userData.data.searchUser[0];
};
