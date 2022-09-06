import client from './apolloClient';
import { GET_USER } from './Query';
import { CREATE_USER } from './Mutation';

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

export const createUser = async (user) => {
  const createUser = await client.mutate({
    mutation: CREATE_USER,
    variables: {
      user: {
        name: user.name,
        aud: user.aud,
        azp: user.azp,
        email_verified: user.email_verified,
        email: user.email,
        exp: user.exp,
        family_name: user.family_name,
        given_name: user.given_name,
        iat: user.iat,
        iss: user.iss,
        jti: user.jti,
        nbf: user.nbf,
        picture: user.picture,
        sub: user.sub,
        role: null,
      },
    },
  });
  return createUser.data;
};
