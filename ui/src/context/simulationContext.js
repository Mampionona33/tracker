import React, { createContext, useReducer } from 'react';

const initialState = {
  methode: 'by_elapsted_time',
  result: 0,
};

const ACTION = {
  SET_SIMULATION_METHODE: 'set_simulation_methode',
  SET_SIMULATION_RESULT: 'set_simulation_result',
};

const simulationReducer = (state, action) => {
  switch (action.type) {
    case ACTION.SET_SIMULATION_METHODE:
      return {
        ...state,
        methode: (state.methode = action.payload),
      };
    case ACTION.SET_SIMULATION_RESULT:
      return {
        ...state,
        result: (state.result = action.payload),
      };

    default:
      break;
  }
};

const SimulationContext = createContext({
  methode: 'by_elapsted_time',
  setSimulationMethode: () => {},
  result: 0,
  setResult: () => {},
});

const SimulationProvider = (props) => {
  const [state, dispatch] = useReducer(simulationReducer, initialState);
  const setSimulationMethode = (methode) => {
    dispatch({
      type: ACTION.SET_SIMULATION_METHODE,
      payload: methode,
    });
  };

  const setResult = (result) => {
    dispatch({ type: ACTION.SET_SIMULATION_RESULT, payload: result });
  };
  return (
    <SimulationContext.Provider
      value={{
        methode: state.methode,
        setSimulationMethode,
        result: state.result,
        setResult,
      }}
      {...props}
    />
  );
};

export { SimulationProvider, SimulationContext };
