import React, { createContext, useReducer } from 'react';

const initialState = {
  taskType: null,
};

const TaskTypeContext = createContext({
  taskType: null,
  setTaskType: (taskType) => {},
});

const ACTION = {
  SET_TASK_TYPE: 'set-taskType',
};

const taskTypeReducer = (state, action) => {
  switch (action.type) {
    case ACTION.SET_TASK_TYPE: {
      return {
        ...state,
        taskType: (state.taskType = action.payload),
      };
    }
    default:
      return state;
  }
};

const TaskTypeProvider = (props) => {
  const [state, dispatch] = useReducer(taskTypeReducer, initialState);
  const setTaskType = (taskType) => {
    dispatch({ type: ACTION.SET_TASK_TYPE, payload: taskType });
  };
  return (
    <TaskTypeContext.Provider
      value={{ taskType: state.taskType, setTaskType }}
      {...props}
    />
  );
};

export { TaskTypeContext, TaskTypeProvider };
