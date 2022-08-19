import React, { createContext, useReducer } from 'react';

const initialState = {
  sideBar: true,
  dialogCreateTask: false,
  dialogConfirmSubmit: false,
  dialogEditProcessingTask: false,
  dialogEditHistory: false,
};

const ACTION = {
  TOGGLE_SIDE_BAR: 'toggle-side-bar',
  TOGGLE_DIALOG_CREATE_TASK: 'toogle-dialog-create-task',
  OPEN_DIALOG_EDIT_PROCESSING_TASK: 'open-dialog-processing-task',
  CLOSE_DIALOG_EDIT_PROCESSING_TASK: 'close-dialog-processing-task',
  OPEN_DIALOG_CONFIRM_SUBMIT_TASK: 'open-dialog-confirm-submit-task',
  CLOSE_DIALOG_CONFIRM_SUBMIT_TASK: 'close-dialog-confirm-submit-task',
  OPEN_DIALOG_EDIT_HISTORY: 'open-dialog-edit-history',
  CLOSE_DIALOG_EDIT_HISTORY: 'closes-dialog-edit-history',
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
    case ACTION.OPEN_DIALOG_CONFIRM_SUBMIT_TASK: {
      return {
        ...state,
        state: (state.dialogConfirmSubmit = true),
      };
    }
    case ACTION.CLOSE_DIALOG_CONFIRM_SUBMIT_TASK: {
      return {
        ...state,
        state: (state.dialogConfirmSubmit = false),
      };
    }
    case ACTION.OPEN_DIALOG_EDIT_HISTORY: {
      return {
        ...state,
        state: (state.dialogEditHistory = true),
      };
    }
    case ACTION.CLOSE_DIALOG_EDIT_HISTORY: {
      return {
        ...state,
        state: (state.dialogEditHistory = false),
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
  dialogConfirmSubmit: false,
  dialogEditHistory: false,
  toggleSideBar: () => {},
  toggleDialogCreateNewTask: () => {},
  openDialogEditProcessingTask: () => {},
  closeDialogEditProcessingTask: () => {},
  openDialogConfirmSubmitTask: () => {},
  closeDialogConfirmSubmitTask: () => {},
  closeDialogEditHistory: () => {},
  openDialogEditHistory: () => {},
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
  const openDialogConfirmSubmitTask = () => {
    dispatch({ type: ACTION.OPEN_DIALOG_CONFIRM_SUBMIT_TASK });
  };

  const closeDialogConfirmSubmitTask = () => {
    dispatch({ type: ACTION.CLOSE_DIALOG_CONFIRM_SUBMIT_TASK });
  };

  const closeDialogEditHistory = () => {
    dispatch({ type: ACTION.CLOSE_DIALOG_EDIT_HISTORY });
  };
  const openDialogEditHistory = () => {
    dispatch({ type: ACTION.OPEN_DIALOG_EDIT_HISTORY });
  };
  return (
    <componentContext.Provider
      value={{
        sideBar: state.sidebar,
        dialogCreateTask: state.dialogCreateTask,
        dialogEditProcessingTask: state.dialogEditProcessingTask,
        dialogConfirmSubmit: state.dialogConfirmSubmit,
        dialogEditHistory: state.dialogEditHistory,
        openDialogEditHistory,
        closeDialogEditHistory,
        toggleDialogCreateNewTask,
        toggleSideBar,
        openDialogEditProcessingTask,
        closeDialogEditProcessingTask,
        openDialogConfirmSubmitTask,
        closeDialogConfirmSubmitTask,
      }}
      {...props}
    />
  );
};

export { ComponentProvider, componentContext };
