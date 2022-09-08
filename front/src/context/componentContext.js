import React, { createContext, useReducer } from 'react';

const initialState = {
  sideBarOpen: false,
  dialogCreatTaskIsOpen: false,
};

const ComponentContext = createContext({
  sideBarOpen: false,
  dialogCreatTaskIsOpen: false,
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

  return (
    <ComponentContext.Provider
      value={{
        sideBarOpen: state.sideBarOpen,
        dialogCreatTaskIsOpen: state.dialogCreatTaskIsOpen,
        setSideBarOpenTrue,
        setdialogCreatTaskClose,
        setdialogCreatTaskOpen,
        setSideBarOpenFalse,
      }}
      {...props}
    />
  );
};

export { ComponentProvider, ComponentContext };
