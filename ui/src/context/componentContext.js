import React, { createContext, useReducer } from 'react';

const initialState = {
  sideBar: true,
};

const componentContext = createContext({
  sideBar: false,
  toggleSideBar: () => {},
});

const ACTION = {
  TOGGLE_SIDE_BAR: 'toggle-side-bar',
};

const componentReducer = (state, action) => {
  switch (action.type) {
    case ACTION.TOGGLE_SIDE_BAR:
      return {
        ...state,
        // get the initial sidebar state and return the opposite
        sidebar: (state.sideBar = !state.sideBar),
      };

    default:
      return state;
  }
};

const ComponentProvider = (props) => {
  const [state, dispatch] = useReducer(componentReducer, initialState);

  //   action creator
  const toggleSideBar = () => {
    dispatch({
      type: ACTION.TOGGLE_SIDE_BAR,
    });
  };

  return (
    <componentContext.Provider
      value={{ sideBar: state.sidebar, toggleSideBar }}
      {...props}
    />
  );
};

export { ComponentProvider, componentContext };
