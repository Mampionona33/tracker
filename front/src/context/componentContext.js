import React, { createContext, useReducer } from 'react';

const initialState = {
  sideBarOpen: false,
};

const ComponentContext = createContext({
  sideBarOpen: false,
  setSideBarOpenTrue: () => {},
  setSideBarOpenFalse: () => {},
});

const ACTION = {
  OPEN_SIDE_BAR: 'open-side-bar',
  CLOSE_SIDE_BAR: 'close-side-bar',
};

const componentReducer = (state, action) => {
  switch (action.type) {
    case ACTION.OPEN_SIDE_BAR:
      return {
        ...state,
        sideBarOpen: (state.sideBarOpen = true),
      };
      break;

    case ACTION.CLOSE_SIDE_BAR: {
      return {
        ...state,
        sideBarOpen: (state.sideBarOpen = false),
      };
    }

    default:
      break;
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

  return (
    <ComponentContext.Provider
      value={{
        sideBarOpen: state.sideBarOpen,
        setSideBarOpenTrue,
        setSideBarOpenFalse,
      }}
      {...props}
    />
  );
};

export { ComponentProvider, ComponentContext };
