import { CREATE_TASK } from './Mutation';

const { default: client } = require('./apolloClient');
const { GET_USER_TASK } = require('./Query');

const getUserTask = async (sub) => {
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

const createTask = async (taskData) => {
  const newTask = await client.mutate({
    mutation: CREATE_TASK,
    variables: {
      task: {
        user: {
          sub: taskData.sub,
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
};

export { getUserTask, createTask };
