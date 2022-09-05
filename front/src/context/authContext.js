import React, { createContext, useReducer } from 'react';
import jwtDecode from 'jwt-decode';

const initialState = {
  user: null,
};

// check if there is item with the key token in the localstorage
if (localStorage.getItem('token')) {
  // if there is token in local storage.
  // Decode it with jwDecode
  const decodeToken = jwtDecode(localStorage.getItem('token'));
  const sub = decodeToken.sub;

  // if there is token,
  // verify the expiration of the token.
  //  if it is less than data now, remove it
  if (decodeToken.exp * 1000 < Date.now()) {
    localStorage.removeItem('token');
  } else {
    initialState.user = decodeToken;
  }
}

const AuthConext = createContext({
  user: null,
  login: (userData) => {},
  logout: () => {},
});

// create a function reducer
const authReducer = (state, action) => {
  switch (action.type) {
    case 'LOGIN':
      return {
        ...state,
        user: action.payload,
      };
      break;
    case 'LOGOUT':
      {
        return {
          ...state,
          user: null,
        };
      }
      break;

    default:
      return state;
      break;
  }
};

const AuthProvider = (props) => {
  const [state, dispatch] = useReducer(authReducer, initialState);

  const login = (credentialResponse) => {
    localStorage.setItem('token', credentialResponse);
    dispatch({
      type: 'LOGIN',
      payload: credentialResponse,
    });
    window.location.reload();
  };

  const logout = () => {
    localStorage.removeItem('token');
    dispatch({ type: 'LOGOUT' });
  };

  return (
    <AuthConext.Provider
      value={{ user: state.user, login, logout }}
      {...props}
    />
  );
};

export { AuthConext, AuthProvider };
