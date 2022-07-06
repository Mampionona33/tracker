import { CREATE_TASK, UPDATE_TASK } from './Mutation';

const { default: client } = require('./apolloClient');
const { GET_USER_TASK, GET_USER_TASK_PLAY } = require('./Query');

export const getUserTask = async (sub) => {
  console.log(sub);
  const userTaskData = await client.query({
    query: GET_USER_TASK,
    variables: {
      input: {
        sub: sub,
      },
    },
  });
  return userTaskData.data.getUserTask;
};

export const createNewTask = async (createTask, sub, taskData, error) => {
  createTask({
    variables: {
      task: {
        user: {
          sub: sub,
        },
        boothNumber: taskData.boothNumber,
        taskState: taskData.taskState,
        type: taskData.type,
        url: taskData.url,
        cat: taskData.cat,
        ivpn: taskData.ivpn,
        statCom: taskData.statCom,
        nbBefore: parseInt(taskData.nbBefore),
        nbAfter: parseInt(taskData.nbAfter),
        comment: taskData.comment,
      },
    },
  });
  if (error) {
    console.log(error);
  }
};

export const getUserTaskPlay = async (sub) => {
  const result = await client.query({
    query: GET_USER_TASK_PLAY,
    variables: {
      input: {
        user: {
          sub: sub,
        },
        taskState: 'isPlay',
      },
    },
  });
  if (result.error) {
    console.log(result.error);
  }
  return result.data.getUserTaskPlay;
};

export const setTaskStateOff = async (id) => {
  const result = await client.mutate({
    mutation: UPDATE_TASK,
    variables: {
      filter: {
        id: id,
      },
      update: {
        taskState: 'isOff',
      },
    },
    refetchQueries: GET_USER_TASK,
    awaitRefetchQueries: true,
  });
  return result.data;
};

export const setTaskStatePause = async (id) => {
  const result = await client.mutate({
    mutation: UPDATE_TASK,
    variables: {
      filter: {
        id: id,
      },
      update: {
        taskState: 'isPause',
      },
    },
    refetchQueries: GET_USER_TASK,
    awaitRefetchQueries: true,
  });
  return result.data;
};
