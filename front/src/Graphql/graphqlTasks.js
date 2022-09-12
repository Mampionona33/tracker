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

export const createNewTask = async (createTask, sub, taskData, error) => {
  await createTask({
    variables: {
      task: {
        user: {
          sub: sub,
        },
      },
      boothNumber: taskData.boothNumber,
      taskState: 'isPlay',
      type: taskData.type,
      url: taskData.url,
      cat: taskData.cat,
      ivpn: taskData.ivpn,
      statCom: taskData.statCom,
      nbBefore: parseInt(taskData.nbBefore),
      nbAfter: parseInt(taskData.nbAfter),
      comment: taskData.comment,
      processingState: 'Normal',
      session: {
        session_id: 0,
        sessionStart: new Date(),
        sessionStop: null,
      },
    },
  });
};

export const setCurrentTaskPlayOff = async (
  updateTask,
  id,
  error,
  currentSessionId
) => {
  updateTask({
    variables: {
      filter: {
        id: id,
        sessionId: currentSessionId,
      },
      update: {
        taskState: 'isOff',
        session: {
          session_id: currentSessionId,
          sessionStop: new Date(),
        },
      },
    },
  });
  if(error){
    return error
  }
};
