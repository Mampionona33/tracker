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

export { getUserTask };
