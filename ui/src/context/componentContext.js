import React, { createContext, useReducer } from 'react';

const initialState = {
  sideBar: true,
  dialogCreateTask: false,
};

const ACTION = {
  TOGGLE_SIDE_BAR: 'toggle-side-bar',
  TOGGLE_DIALOG_CREATE_TASK: 'toogle-dialog-create-task',
};

const componentReducer = (state, action) => {
  switch (action.type) {
    case ACTION.TOGGLE_SIDE_BAR:
      return {
        ...state,
        // get the initial sidebar state and return the opposite
        sidebar: (state.sideBar = !state.sideBar),
      };

    case ACTION.TOGGLE_DIALOG_CREATE_TASK: {
      return {
        ...state,
        state: (state.dialogCreateTask = !state.dialogCreateTask),
      };
    }

    default:
      return state;
  }
};

const componentContext = createContext({
  // initialize context
  // then provide it as value in componentContext.Provider
  sideBar: false,
  dialogCreateTask: false,
  toggleSideBar: () => {},
  toggleDialogCreateNewTask: () => {},
});

const ComponentProvider = (props) => {
  const [state, dispatch] = useReducer(componentReducer, initialState);

  //   action creator
  const toggleSideBar = () => {
    dispatch({
      type: ACTION.TOGGLE_SIDE_BAR,
    });
  };

  const toggleDialogCreateNewTask = () => {
    dispatch({ type: ACTION.TOGGLE_DIALOG_CREATE_TASK });
  };

  return (
    <componentContext.Provider
      value={{
        sideBar: state.sidebar,
        dialogCreateTask: state.dialogCreateTask,
        toggleDialogCreateNewTask,
        toggleSideBar,
      }}
      {...props}
    />
  );
};

export { ComponentProvider, componentContext };
