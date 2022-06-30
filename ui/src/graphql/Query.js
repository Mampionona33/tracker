import { gql } from '@apollo/client';

export const GET_USER = gql`
  query SearchUser($input: UserIdInput) {
    searchUser(input: $input) {
      role
      email
      exp
      family_name
      given_name
      name
      nbf
      picture
      sub
    }
  }
`;

export const GET_USER_TASK = gql`
  query GetUserTask($input: UserInput) {
    getUserTask(input: $input) {
      boothNumber
      type
      url
      cat
      ivpn
      statCom
      processingState
      nbBefore
      nbAfter
      comment
      taskState
    }
  }
`;
