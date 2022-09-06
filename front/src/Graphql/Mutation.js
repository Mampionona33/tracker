import { gql } from '@apollo/client';

export const CREATE_USER = gql`
  mutation CreatUser($user: UserInput!) {
    creatUser(user: $user) {
      aud
      azp
      email
      email_verified
      exp
      family_name
      given_name
      iat
      iss
      jti
      name
      nbf
      picture
      sub
      role
    }
  }
`;
