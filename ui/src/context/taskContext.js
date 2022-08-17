import jwtDecode from 'jwt-decode';
import React, { createContext, useReducer } from 'react';
import { getUserTask } from '../graphql/tasks';

const initialState = {
  processinTask: null,
  userTasks: null,
  userTaskPlay: [],
  userTaskPause: null,
  productivity: 0,
  totalElapstedTime: '',
};

if (localStorage.getItem('token')) {
  const decodToken = jwtDecode(localStorage.getItem('token'));
  const sub = decodToken.sub;
  if (sub) {
    (async () => {
      const userTaskData = await getUserTask(sub);
      if (userTaskData) {
        const userTaskDataArray = Array.from(userTaskData);
        initialState.userTasks = userTaskData;
        const userTaskPlay = userTaskData.filter(
          (item) => item.taskState === 'isPlay'
        );
        const processingTask = userTaskDataArray.filter(
          (item) => item.taskState === 'isPlay' || item.taskState === 'isPause'
        );
        if (processingTask.length > 0) {
          initialState.processinTask = processingTask[0];
        }
        if (userTaskPlay) {
          initialState.userTaskPlay = userTaskPlay;
        }
      }
    })();
  }
}

const TaskContext = createContext({
  processinTask: null,
  userTasks: null,
  userTaskPlay: null,
  userTaskPause: null,
  productivity: 0,
  totalElapstedTime: '',
  setTotalElapstedTime: () => {},
  setProductivity: () => {},
  setProcessingTask: (processinTask) => {},
  setUserTasks: (userTasks) => {},
  setUserTaskPlay: (userTaskPlay) => {},
  setUserTaskPause: (userTaskPause) => {},
});

const ACTION = {
  SET_USER_TASKS: 'set-user-tasks',
  SET_USER_TASK_PLAY: 'set-user-task-play',
  SET_PROCESSING_TASK: 'set-processing-task',
  SET_PRODUCTIVITY: 'set-productivity',
  SET_TOTAL_ELAPSTED_TIME: 'set-total-elapsted-time',
};

const taskReducer = (state, action) => {
  switch (action.type) {
    case ACTION.SET_USER_TASKS: {
      return {
        ...state,
        userTasks: (state.userTasks = action.payload),
      };
    }
    case ACTION.SET_USER_TASK_PLAY: {
      return {
        ...state,
        userTaskPlay: (state.userTaskPlay = action.payload),
      };
    }
    case ACTION.SET_PROCESSING_TASK: {
      return {
        ...state,
        processinTask: (state.processinTask = action.payload),
      };
    }
    case ACTION.SET_PRODUCTIVITY: {
      return {
        ...state,
        productivity: (state.productivity = action.payload),
      };
    }
    case ACTION.SET_TOTAL_ELAPSTED_TIME: {
      return {
        ...state,
        totalElapstedTime: (state.totalElapstedTime = action.payload),
      };
    }
    default:
      return state;
  }
};

const TaskProvider = (props) => {
  const [state, dispatch] = useReducer(taskReducer, initialState);

  const setUserTasks = (userTasks) => {
    dispatch({ type: ACTION.SET_USER_TASKS, payload: userTasks });
  };

  const setUserTaskPlay = (userTasksPlay) => {
    dispatch({ type: ACTION.SET_USER_TASK_PLAY, payload: userTasksPlay });
  };
  const setUserTaskPause = (userTasksPlay) => {
    dispatch({ type: ACTION.SET_USER_TASK_PLAY, payload: userTasksPlay });
  };

  const setProcessingTask = (processinTask) => {
    dispatch({ type: ACTION.SET_PROCESSING_TASK, payload: processinTask });
  };

  const setProductivity = (prod) => {
    dispatch({ type: ACTION.SET_PRODUCTIVITY, payload: prod });
  };

  const setTotalElapstedTime = (totalElpastTime) => {
    dispatch({
      type: ACTION.SET_TOTAL_ELAPSTED_TIME,
      payload: totalElpastTime,
    });
  };

  return (
    <TaskContext.Provider
      value={{
        userTasks: state.userTasks,
        userTaskPlay: state.userTaskPlay,
        userTaskPause: state.userTaskPause,
        processinTask: state.processinTask,
        productivity: state.productivity,
        totalElapstedTime: state.totalElapstedTime,
        setTotalElapstedTime,
        setProductivity,
        setUserTasks,
        setUserTaskPlay,
        setUserTaskPause,
        setProcessingTask,
      }}
      {...props}
    />
  );
};

export { TaskContext, TaskProvider };
