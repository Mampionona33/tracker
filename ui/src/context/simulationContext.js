import React, { createContext, useReducer } from 'react';

const initialState = {
  methode: 'by_elapsted_time',
};

const ACTION = {
  SET_SIMULATION_METHODE: 'set_simulation_methode',
};

const simulationReducer = (state, action) => {
  switch (action.type) {
    case ACTION.SET_SIMULATION_METHODE:
      return {
        ...state,
        methode: (state.methode = action.payload),
      };

    default:
      break;
  }
};

const SimulationContext = createContext({
  methode: 'by_elapsted_time',
  setSimulationMethode: () => {},
});

const SimulationProvider = (props) => {
  const [state, dispatch] = useReducer(simulationReducer, initialState);
  const setSimulationMethode = (methode) => {
    dispatch({
      type: ACTION.SET_SIMULATION_METHODE,
      payload: methode,
    });
  };

  return (
    <SimulationContext.Provider
      value={{
        methode: state.methode,
        setSimulationMethode,
      }}
      {...props}
    />
  );
};

export { SimulationProvider, SimulationContext };
