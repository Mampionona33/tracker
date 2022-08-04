import React, { createContext, useReducer } from 'react';

const initialState = {
  sideBar: true,
  dialogCreateTask: false,
  dialogEditProcessingTask: false,
};

const ACTION = {
  TOGGLE_SIDE_BAR: 'toggle-side-bar',
  TOGGLE_DIALOG_CREATE_TASK: 'toogle-dialog-create-task',
  OPEN_DIALOG_EDIT_PROCESSING_TASK: 'open-dialog-processing-task',
  CLOSE_DIALOG_EDIT_PROCESSING_TASK: 'close-dialog-processing-task',
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

    case ACTION.OPEN_DIALOG_EDIT_PROCESSING_TASK: {
      return {
        ...state,
        state: (state.dialogEditProcessingTask = true),
      };
    }

    case ACTION.CLOSE_DIALOG_EDIT_PROCESSING_TASK: {
      return {
        ...state,
        state: (state.dialogEditProcessingTask = false),
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
  dialogEditProcessingTask: false,
  toggleSideBar: () => {},
  toggleDialogCreateNewTask: () => {},
  openDialogEditProcessingTask: () => {},
  closeDialogEditProcessingTask: () => {},
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

  const openDialogEditProcessingTask = () => {
    dispatch({ type: ACTION.OPEN_DIALOG_EDIT_PROCESSING_TASK });
  };
  const closeDialogEditProcessingTask = () => {
    dispatch({ type: ACTION.CLOSE_DIALOG_EDIT_PROCESSING_TASK });
  };

  return (
    <componentContext.Provider
      value={{
        sideBar: state.sidebar,
        dialogCreateTask: state.dialogCreateTask,
        dialogEditProcessingTask: state.dialogEditProcessingTask,
        toggleDialogCreateNewTask,
        toggleSideBar,
        openDialogEditProcessingTask,
        closeDialogEditProcessingTask,
      }}
      {...props}
    />
  );
};

export { ComponentProvider, componentContext };
