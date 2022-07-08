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
      session {
        sessionStart
        sessionStop
      }
    }
  }
`;

export const GET_USER_PROCESSING_TASK = gql`
  query GetUserTaskPlay($input: TaskInput) {
    getUserTaskPlay(input: $input) {
      boothNumber
      comment
      nbAfter
      nbBefore
      processingState
      statCom
      ivpn
      cat
      url
      type
      taskState
      id
      session {
        sessionStart
        sessionStop
      }
    }
  }
`;

export const GET_TASK_BY_DATE = gql`
  query GetTaskByDate($query: GetTaskByDateInput) {
    getTaskByDate(query: $query) {
      boothNumber
      session {
        sessionStart
        sessionStop
      }
      id
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
