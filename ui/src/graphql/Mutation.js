const { gql } = require('@apollo/client');

export const CREAT_USER = gql`
  mutation CreatUser($user: UserInput!) {
    creatUser(user: $user) {
      sub
      picture
      nbf
      name
      jti
      iss
      iat
      given_name
      family_name
      exp
      email_verified
      email
      aud
      azp
    }
  }
`;
