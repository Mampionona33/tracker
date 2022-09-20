import React, { createContext, useReducer } from 'react';

const initialState = {
  sideBarOpen: false,
  dialogCreatTaskIsOpen: false,
  dialogEditTask: false,
  dialogConfirmSubmit: false,
};

const ComponentContext = createContext({
  sideBarOpen: false,
  dialogCreatTaskIsOpen: false,
  dialogEditTask: false,
  dialogConfirmSubmit: false,
  setDialogConfirmSubmitClose: () => {},
  setDialogConfirmSubmitOpen: () => {},
  setDialogEditTaskOpen: () => {},
  setDialogEditTaskClose: () => {},
  setdialogCreatTaskOpen: () => {},
  setdialogCreatTaskClose: () => {},
  setSideBarOpenTrue: () => {},
  setSideBarOpenFalse: () => {},
});

const ACTION = {
  OPEN_SIDE_BAR: 'open-side-bar',
  CLOSE_SIDE_BAR: 'close-side-bar',
  OPEN_DIALOG_CREATE_TASK: 'open-dialog-create-task',
  COLOSE_DIALOG_CREATE_TASK: 'close-dialog-create-task',
  OPEN_DIALOG_EDIT_TASK: 'open-dialog-edit-task',
  CLOSE_DIALOG_EDIT_TASK: 'close-dialog-edit-task',
  CLOSE_DIALOG_CONFIRM_SUBMIT: 'close-dialog-confirm-submit',
  OPEN_DIALOG_CONFIRM_SUBMIT: 'open-dialog-confirm-submit',
};

const componentReducer = (state, action) => {
  switch (action.type) {
    case ACTION.OPEN_SIDE_BAR:
      return {
        ...state,
        sideBarOpen: (state.sideBarOpen = true),
      };

    case ACTION.CLOSE_SIDE_BAR: {
      return {
        ...state,
        sideBarOpen: (state.sideBarOpen = false),
      };
    }
    case ACTION.OPEN_DIALOG_CREATE_TASK: {
      return {
        ...state,
        dialogCreatTaskIsOpen: (state.dialogCreatTaskIsOpen = true),
      };
    }
    case ACTION.COLOSE_DIALOG_CREATE_TASK: {
      return {
        ...state,
        dialogCreatTaskIsOpen: (state.dialogCreatTaskIsOpen = false),
      };
    }
    case ACTION.OPEN_DIALOG_EDIT_TASK: {
      return {
        ...state,
        dialogEditTask: (state.dialogEditTask = true),
      };
    }
    case ACTION.CLOSE_DIALOG_EDIT_TASK: {
      return {
        ...state,
        dialogEditTask: (state.dialogEditTask = false),
      };
    }
    case ACTION.CLOSE_DIALOG_CONFIRM_SUBMIT: {
      return {
        ...state,
        dialogConfirmSubmit: (state.dialogConfirmSubmit = false),
      };
    }
    case ACTION.OPEN_DIALOG_CONFIRM_SUBMIT: {
      return {
        ...state,
        dialogConfirmSubmit: (state.dialogConfirmSubmit = true),
      };
    }

    default:
      return state;
  }
};

const ComponentProvider = (props) => {
  const [state, dispatch] = useReducer(componentReducer, initialState);
  const setSideBarOpenTrue = () => {
    dispatch({ type: ACTION.OPEN_SIDE_BAR });
  };
  const setSideBarOpenFalse = () => {
    dispatch({ type: ACTION.CLOSE_SIDE_BAR });
  };
  const setdialogCreatTaskOpen = () => {
    dispatch({ type: ACTION.OPEN_DIALOG_CREATE_TASK });
  };
  const setdialogCreatTaskClose = () => {
    dispatch({ type: ACTION.COLOSE_DIALOG_CREATE_TASK });
  };

  const setDialogEditTaskOpen = () => {
    dispatch({ type: ACTION.OPEN_DIALOG_EDIT_TASK });
  };

  const setDialogEditTaskClose = () => {
    dispatch({ type: ACTION.CLOSE_DIALOG_EDIT_TASK });
  };

  const setDialogConfirmSubmitClose = () => {
    dispatch({ type: ACTION.CLOSE_DIALOG_CONFIRM_SUBMIT });
  };

  const setDialogConfirmSubmitOpen = (params) => {
    dispatch({ type: ACTION.OPEN_DIALOG_CONFIRM_SUBMIT });
  };

  return (
    <ComponentContext.Provider
      value={{
        sideBarOpen: state.sideBarOpen,
        dialogCreatTaskIsOpen: state.dialogCreatTaskIsOpen,
        dialogEditTask: state.dialogEditTask,
        dialogConfirmSubmit: state.dialogConfirmSubmit,
        setDialogConfirmSubmitClose,
        setDialogConfirmSubmitOpen,
        setSideBarOpenTrue,
        setdialogCreatTaskClose,
        setdialogCreatTaskOpen,
        setSideBarOpenFalse,
        setDialogEditTaskOpen,
        setDialogEditTaskClose,
      }}
      {...props}
    />
  );
};

export { ComponentProvider, ComponentContext };
