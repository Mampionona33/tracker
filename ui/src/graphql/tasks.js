import { CREATE_TASK, UPDATE_TASK } from './Mutation';

const { default: client } = require('./apolloClient');
const { GET_USER_TASK, GET_USER_PROCESSING_TASK } = require('./Query');

export const getUserTask = async (sub) => {
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

export const getUserTaskPlay = async (sub) => {
  const result = await client.query({
    query: GET_USER_PROCESSING_TASK,
    variables: {
      input: {
        user: {
          sub: sub,
        },
        taskState: 'isPlay' && 'isPause',
      },
    },
  });
  if (result.error) {
    console.log(result.error);
  }
  return result.data.getUserTaskPlay;
};

export const setTaskStateOff = async (
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
        },
      },
    },
  });
  if (error) {
    console.log(error);
  }
  return;
};

export const setCurrentTaskPlayToOff = async (
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
        },
      },
    },
  });
  if (error) {
    console.log(error);
  }
  return;
};

export const setCurrentTaskPauseToOff = async (
  updateTask,
  id,
  error,
  currentSessionId
) => {
  updateTask({
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
  return;
};

export const setTaskStatePause = async (
  updateTask,
  id,
  error,
  currentSessionId
) => {
  updateTask({
    variables: {
      filter: {
        sessionId: currentSessionId,
        id: id,
      },
      update: {
        taskState: 'isPause',
        session: {
          session_id: currentSessionId,
        },
      },
    },
  });
  if (error) {
    console.log(error);
  }
};

export const setTaskStatePlay = async (
  updateTask,
  id,
  error,
  currentSessionId
) => {
  updateTask({
    variables: {
      filter: {
        id: id,
      },
      update: {
        taskState: 'isPlay',
        session: {
          session_id: currentSessionId,
        },
      },
    },
  });
  if (error) {
    console.log(error);
  }
};

export const getTaskByDate = async (getTaskByDate, date, sub) => {
  getTaskByDate({
    variables: {
      query: {
        session: {
          sessionStart: date.slice(10),
        },
        user: {
          sub: sub,
        },
      },
    },
  });
};

export const getPendingTask = async (getUserTaskByFilter, sub) => {
  getUserTaskByFilter({
    variables: {
      input: {
        taskState: 'isOff',
        user: {
          sub: sub,
        },
      },
    },
  });
};

export const updateProcessingTask = async (
  updateTask,
  id,
  boothNumber,
  type,
  statCom,
  url,
  cat,
  ivpn,
  nbBefore,
  nbAfter,
  comment
) => {
  updateTask({
    variables: {
      filter: {
        id: id,
      },
      update: {
        boothNumber: boothNumber !== '' ? boothNumber : 'empty',
        statCom: statCom,
        type: type !== '' ? type : 'empty',
        url: url !== '' ? url : 'empty',
        cat: cat !== '' ? cat : 'empty',
        ivpn: ivpn !== '' ? ivpn : 'I',
        nbBefore: nbBefore ? parseInt(nbBefore) : 0,
        nbAfter: nbAfter ? parseFloat(nbAfter) : 0,
        comment: comment ? comment : 'empty',
      },
    },
  });
};

export const setTaskStatePlayDone = async (
  updateTask,
  id,
  prod,
  totalElapstedTime,
  sessionId,
  error
) => {
  updateTask({
    variables: {
      filter: {
        id: id,
        sessionId: sessionId,
      },
      update: {
        taskState: 'isDone',
        submitedDate: new Date(),
        totalElapstedTime: totalElapstedTime,
        productivity: prod,
        session: {
          session_id: sessionId,
          sessionStop: new Date(),
        },
      },
    },
  });
  return;
};

export const setTaskStatePauseDone = async (
  updateTask,
  id,
  prod,
  totalElapstedTime,
  error
) => {
  updateTask({
    variables: {
      filter: {
        id: id,
      },
      update: {
        taskState: 'isDone',
        submitedDate: new Date(),
        totalElapstedTime: totalElapstedTime,
        productivity: prod,
      },
    },
  });
  return;
};

export const updateSessionRow = async (
  updateTask,
  id,
  error,
  currentSessionId,
  sessionStart,
  sessionStop
) => {
  updateTask({
    variables: {
      filter: {
        id: id,
        sessionId: currentSessionId,
      },
      update: {
        session: {
          session_id: currentSessionId,
          sessionStart: sessionStart,
          sessionStop: sessionStop,
        },
      },
    },
  });
  if (error) {
    console.log(error);
  }
  return;
};
