import React, { createContext, useReducer } from 'react';

const initialState = {
  userTasks: null,
  userTaskPlay: null,
  userTaskPause: null,
};

const TaskContext = createContext({
  userTasks: null,
  userTaskPlay: null,
  userTaskPause: null,
  setUserTasks: (userTasks) => {},
  setUserTaskPlay: (userTaskPlay) => {},
  setUserTaskPause: (userTaskPause) => {},
});

const ACTION = {
  SET_USER_TASKS: 'set-user-tasks',
  SET_USER_TASK_PLAY: 'set-user-task-play',
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

  return (
    <TaskContext.Provider
      value={{
        userTasks: state.userTasks,
        userTaskPlay: state.userTaskPlay,
        setUserTasks,
        setUserTaskPlay,
      }}
      {...props}
    />
  );
};

export { TaskContext, TaskProvider };
