import React, { createContext, useReducer } from 'react';

const initialState = {
  selectedDate: new Date(),
};

const ACTION = {
  SET_SELECTED_DATE: 'set-selected-date',
};

const historyReducer = (state, action) => {
  switch (action.type) {
    case ACTION.SET_SELECTED_DATE:
      return {
        ...state,
        selectedDate: (state.selectedDate = action.payload),
      };
    default:
      return state;
  }
};

const HistoryContext = createContext({
  selectedDate: null,
  setSelectedDate: () => {},
});

const HistoryProvider = (props) => {
  const [state, dispatch] = useReducer(historyReducer, initialState);

  const setSelectedDate = (selectedDate) => {
    console.log('dispatched action : ', selectedDate);
    dispatch({ type: ACTION.SET_SELECTED_DATE, payload: selectedDate });
  };
  return (
    <HistoryContext.Provider
      value={{ selectedDate: state.selectedDate, setSelectedDate }}
      {...props}
    />
  );
};

export { HistoryContext, HistoryProvider };
