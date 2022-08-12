import React, { createContext, useReducer } from 'react';

const initialState = {
  simulationMethode: 'by_elapsted_time',
};

const ACTION = {
  SET_SIMULATION_METHODE: 'set_simulation_methode',
};

const simulationReducer = (state, action) => {
  switch (action.type) {
    case ACTION.SET_SIMULATION_METHODE:
      return {
        ...state,
        simulationMethode: (state.simulationMethode = action.payload),
      };

    default:
      break;
  }
};

const SimulationContext = createContext({
  simulationMethode: 'by_elapsted_time',
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
        simulationMethode: state.simulationMethode,
        setSimulationMethode,
      }}
      {...props}
    />
  );
};

export { SimulationProvider, SimulationContext };
