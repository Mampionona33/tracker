import client from './apolloClient';
import { GET_ALL_TASK_TYPE } from './Query';

export const getTaskType = async () => {
  const getAllTaskTypeList = await client.query({
    query: GET_ALL_TASK_TYPE,
  });
  return getAllTaskTypeList.data.getAllTaskTypeList;
};
