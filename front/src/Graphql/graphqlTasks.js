import client from './apolloClient';
import { GET_USER_TASK } from './Query';

export const getUserTasks = async (sub) => {
  const getUserTask = await client.query({
    query: GET_USER_TASK,
    variables: {
      input: {
        sub: sub,
      },
    },
  });
  return getUserTask.data.getUserTask;
};
