import React, { createContext, useReducer } from 'react';

const initialState = {
  sideBarOpen: false,
  dialogCreatTaskIsOpen: false,
  dialogEditTask: false,
  dialogConfirmSubmit: false,
  mockProdByEndingTime: false,
};

const ComponentContext = createContext({
  sideBarOpen: false,
  dialogCreatTaskIsOpen: false,
  dialogEditTask: false,
  dialogConfirmSubmit: false,
  mockProdByEndingTime: false,
  setMockProdByEndingTimeTrue: () => {},
  setMockProdByEndingTimeFalse: () => {},
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
  SET_MOKPROD_BY_ENDING_TIME_FALSE: 'set-mockProd-by-ending-time-false',
  SET_MOKPROD_BY_ENDING_TIME_TRUE: 'set-mockProd-by-ending-time-true',
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
    case ACTION.SET_MOKPROD_BY_ENDING_TIME_TRUE: {
      return {
        ...state,
        mockProdByEndingTime: (state.mockProdByEndingTime = true),
      };
    }
    case ACTION.SET_MOKPROD_BY_ENDING_TIME_FALSE: {
      return {
        ...state,
        mockProdByEndingTime: (state.mockProdByEndingTime = false),
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

  const setDialogConfirmSubmitOpen = () => {
    dispatch({ type: ACTION.OPEN_DIALOG_CONFIRM_SUBMIT });
  };

  const setMockProdByEndingTimeTrue = () => {
    dispatch({ type: ACTION.SET_MOKPROD_BY_ENDING_TIME_TRUE });
  };

  const setMockProdByEndingTimeFalse = () => {
    dispatch({ type: ACTION.SET_MOKPROD_BY_ENDING_TIME_FALSE });
  };

  return (
    <ComponentContext.Provider
      value={{
        sideBarOpen: state.sideBarOpen,
        dialogCreatTaskIsOpen: state.dialogCreatTaskIsOpen,
        dialogEditTask: state.dialogEditTask,
        dialogConfirmSubmit: state.dialogConfirmSubmit,
        mockProdByEndingTime: state.mockProdByEndingTime,
        setMockProdByEndingTimeFalse,
        setMockProdByEndingTimeTrue,
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
