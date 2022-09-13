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

export const GET_USER_TASK = gql`
  query GetUserTask($input: UserInput) {
    getUserTask(input: $input) {
      id
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
      submitedDate
      productivity
      totalElapstedTime
      session {
        session_id
        sessionStart
        sessionStop
      }
    }
  }
`;

export const GET_ALL_TASK_TYPE = gql`
  query GetAllTaskTypeList {
    getAllTaskTypeList {
      id
      name
      goal
    }
  }
`;

export const GET_TASK_BY_FILTER = gql`
  query GetUserTaskByFilter($input: TaskInput) {
    getUserTaskByFilter(input: $input) {
      id
      user {
        sub
      }
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
      submitedDate
      productivity
      totalElapstedTime
      session {
        session_id
        sessionStart
        sessionStop
      }
    }
  }
`;
