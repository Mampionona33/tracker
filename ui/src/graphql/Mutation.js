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

export const CREATE_TASK = gql`
  mutation CreateTask($task: TaskInput) {
    createTask(task: $task) {
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
    }
  }
`;

export const UPDATE_TASK = gql`
  mutation UpdateTask($update: TaskInput, $filter: FilterTaskPlay) {
    updateTask(update: $update, filter: $filter) {
      acknowledged
    }
  }
`;
