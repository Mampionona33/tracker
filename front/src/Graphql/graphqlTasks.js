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

export const mutateUpdateProcessingTask = async (
  updateTask,
  processingTaskData
) => {
  updateTask({
    variables: {
      filter: {
        id: processingTaskData.id,
      },
      update: {
        boothNumber:
          processingTaskData.boothNumber !== ''
            ? processingTaskData.boothNumber
            : 'empty',
        statCom: processingTaskData.statCom,
        type:
          processingTaskData.type !== '' ? processingTaskData.type : 'empty',
        url: processingTaskData.url !== '' ? processingTaskData.url : 'empty',
        cat: processingTaskData.cat !== '' ? processingTaskData.cat : 'empty',
        ivpn: processingTaskData.ivpn !== '' ? processingTaskData.ivpn : 'I',
        nbBefore: processingTaskData.nbBefore
          ? parseInt(processingTaskData.nbBefore)
          : 0,
        nbAfter: processingTaskData.nbAfter
          ? parseInt(processingTaskData.nbAfter)
          : 0,
        comment: processingTaskData.comment
          ? processingTaskData.comment
          : 'empty',
      },
    },
  });
  return updateTask;
};

export const mutateTaskStatePauseToDone = async (
  updateTaskState,
  taskId,
  productivity,
  totalElapstedTime
) => {
  updateTaskState({
    variables: {
      filter: {
        id: taskId,
      },
      update: {
        taskState: 'isDone',
        submitedDate: new Date(),
        totalElapstedTime: totalElapstedTime,
        productivity: productivity,
      },
    },
  });
  return;
};

export const mutateTakStatePlayToDone = async (
  updateTask,
  taskId,
  productivity,
  totalElapstedTime,
  sessionId
) => {
  updateTask({
    variables: {
      filter: {
        id: taskId,
        sessionId: sessionId,
      },
      update: {
        taskState: 'isDone',
        submitedDate: new Date(),
        totalElapstedTime: totalElapstedTime,
        productivity: productivity,
        session: {
          session_id: sessionId,
          sessionStop: new Date(),
        },
      },
    },
  });
  return;
};
