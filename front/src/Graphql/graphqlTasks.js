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
    fetchPolicy: 'no-cache',
  });
  return getUserTask.data.getUserTask;
};

export const createNewTask = async (createTask, sub, taskData, error) => {
  createTask({
    variables: {
      task: {
        user: {
          sub: sub,
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
    },
  });
  if (error) {
    console.log(error);
  }
};

export const mutateCurrentTaskPlayOff = async (
  updateTask,
  id,
  error,
  currentSessionId
) => {
  const setTaskOff = updateTask({
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
  if (error) {
    return error;
  }
  return setTaskOff;
};

export const mutateCurrentTaskPauseOff = async (updateTask, id, error) => {
  await updateTask({
    variables: {
      filter: {
        id: id,
      },
      update: {
        taskState: 'isOff',
      },
    },
  });
  if (error) {
    console.log(error);
  }
  return updateTask;
};

export const mutateTaskStateToPlay = async (
  updateTask,
  taskId,
  error,
  currentSessionId
) => {
  updateTask({
    variables: {
      filter: {
        id: taskId,
      },
      update: {
        taskState: 'isPlay',
        session: {
          session_id: currentSessionId,
          sessionStart: new Date(),
        },
      },
    },
  });
  if (error) {
    console.log(error);
  }
};

export const mutateTaskStateToPause = async (
  updateTask,
  currentTaskId,
  error,
  currentSessionId
) => {
  updateTask({
    variables: {
      filter: {
        id: currentTaskId,
        sessionId: currentSessionId,
      },
      update: {
        taskState: 'isPause',
        session: {
          session_id: currentSessionId,
          sessionStop: new Date(),
        },
      },
    },
  });
  if (error) {
    console.log(error);
  }
};
