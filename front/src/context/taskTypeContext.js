import React, { createContext, useReducer } from 'react';

const initialState = {
  taskTypeList: null,
};

const TaskTypeContext = createContext({
  taskTypeList: null,
  setTaskTypeList: (tasktype) => {},
});

const ACTION = {
  SET_TASK_TYPE_LIST: 'set-task-type-list',
};

const taskTypeReducer = (state, action) => {
  switch (action.type) {
    case ACTION.SET_TASK_TYPE_LIST:
      return {
        ...state,
        taskTypeList: (state.taskTypeList = action.payload),
      };
    default:
      return state;
  }
};

const TaskTypeListProvider = (props) => {
  const [state, dispatch] = useReducer(taskTypeReducer, initialState);
  const setTaskTypeList = (taskType) => {
    dispatch({ type: ACTION.SET_TASK_TYPE_LIST, payload: taskType });
  };
  return (
    <TaskTypeContext.Provider
      value={{ taskTypeList: state.taskTypeList, setTaskTypeList }}
      {...props}
    />
  );
};

export { TaskTypeContext, TaskTypeListProvider };
