import React, { createContext, useReducer } from 'react';
import jwtDecode from 'jwt-decode';

// set initial user state to null
const initialState = {
  user: null,
};

// check if there is item with the key token in the localstorage
if (localStorage.getItem('token')) {
  // if there is token in local storage.
  // Decode it with jwDecode
  const decodedToken = jwtDecode(localStorage.getItem('token'));

  // if there is token,
  // verify the expiration of the token.
  //  if it is less than data now, remove it
  if (decodedToken.exp * 1000 < Date.now()) {
    localStorage.removeItem('token');
  } else {
    // else, set initial state user = to decodedToken
    initialState.user = decodedToken;
  }
}

// create context with initial state
const AuthContext = createContext({
  user: null,
  login: (userData) => {},
  logout: () => {},
});

// create a function reducer
function authReducer(state, action) {
  switch (action.type) {
    case 'LOGIN':
      return {
        ...state,
        user: action.payload,
      };
    case 'LOGOUT': {
      return {
        ...state,
        user: null,
      };
    }

    default:
      return state;
  }
}

// create a function AuthProvider with authReducer
// then export it
// import it at the top level of app
// In over words, import it in ../src/index.jsx
// And warp the <App/> component between <AuthProvider><AuthProvider/>
function AuthProvider(props) {
  const [state, dispatch] = useReducer(authReducer, initialState);

  const login = (userData) => {
    localStorage.setItem('token', userData);
    dispatch({
      type: 'LOGIN',
      payload: userData,
    });
  };

  const logout = () => {
    localStorage.removeItem('token');
    // execue window.location.reload() to clear state in all previews context
    window.location.reload();
    dispatch({ type: 'LOGOUT' });
  };

  return (
    <AuthContext.Provider
      value={{ user: state.user, login, logout }}
      {...props}
    />
  );
}

export { AuthContext, AuthProvider };
