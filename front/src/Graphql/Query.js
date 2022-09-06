import { gql } from '@apollo/client';

export const GET_USER = gql`
  query SearchUser($input: UserIdInput) {
    searchUser(input: $input) {
      email
      email_verified
      family_name
      exp
      given_name
      iat
      iss
      jti
      name
      nbf
      picture
      sub
      role
      azp
      aud
      role
    }
  }
`;
