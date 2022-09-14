import client from './apolloClient';

export const getTaskType = async () => {
  const getAllTaskTypeList = await client.query({
    query: GET_ALL_TASK_TYPE,
  });
  return getAllTaskTypeList.data.getAllTaskTypeList;
};
