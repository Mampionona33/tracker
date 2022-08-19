import React, { createContext, useReducer } from 'react';

const initialState = {
  selectedDate: new Date(),
  historyData: {},
};

const ACTION = {
  SET_SELECTED_DATE: 'set-selected-date',
  SET_HISTORY_DATA: 'set-history-data',
};

const historyReducer = (state, action) => {
  switch (action.type) {
    case ACTION.SET_SELECTED_DATE:
      return {
        ...state,
        selectedDate: (state.selectedDate = action.payload),
      };
    case ACTION.SET_HISTORY_DATA:
      return {
        ...state,
        historyData: (state.historyData = action.payload),
      };

    default:
      return state;
  }
};

const HistoryContext = createContext({
  selectedDate: null,
  historyData: {},
  setSelectedDate: () => {},
  setHistoryData: () => {},
});

const HistoryProvider = (props) => {
  const [state, dispatch] = useReducer(historyReducer, initialState);

  const setSelectedDate = (selectedDate) => {
    dispatch({ type: ACTION.SET_SELECTED_DATE, payload: selectedDate });
  };
  const setHistoryData = (data) => {
    dispatch({ type: ACTION.SET_HISTORY_DATA, payload: data });
  };
  return (
    <HistoryContext.Provider
      value={{
        selectedDate: state.selectedDate,
        historyData: state.historyData,
        setHistoryData,
        setSelectedDate,
      }}
      {...props}
    />
  );
};

export { HistoryContext, HistoryProvider };
