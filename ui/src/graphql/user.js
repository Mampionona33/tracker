import client from './apolloClient';
import { GET_USER } from './Query';
import { CREAT_USER } from './Mutation';

// This funtcion is used to get the user information
// from the data base. By using the sub key from
// the google login as variablse
const getUser = async (sub) => {
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

const createUser = async (user) => {
  await client.mutate({
    mutation: CREAT_USER,
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
      },
    },
  });
};



export { getUser, createUser };
