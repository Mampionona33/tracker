import React, { createContext, useReducer } from 'react';
import jwtDecode from 'jwt-decode';

const initialState = {
  user: null,
  sub: null,
  userRole: null,
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
    initialState.sub = decodeToken.sub;
  }
}

const AuthConext = createContext({
  user: null,
  sub: null,
  userRole: null,
  setUserRole: (role) => {},
  login: (userData) => {},
  logout: () => {},
});

const ACTION = {
  LOGOUT: 'logout',
  LOGIN: 'login',
  SET_USER_ROLE: 'set-user-role',
};

// create a function reducer
const authReducer = (state, action) => {
  switch (action.type) {
    case ACTION.LOGIN:
      return {
        ...state,
        user: action.payload,
      };
    case ACTION.LOGOUT: {
      return {
        ...state,
        user: null,
      };
    }

    case ACTION.SET_USER_ROLE:
      return {
        ...state,
        userRole: action.payload,
      };

    default:
      return state;
  }
};

const AuthProvider = (props) => {
  const [state, dispatch] = useReducer(authReducer, initialState);

  const login = (credentialResponse) => {
    localStorage.setItem('token', credentialResponse);
    dispatch({
      type: ACTION.LOGIN,
      payload: credentialResponse,
    });
    window.location.reload();
  };

  const logout = () => {
    localStorage.removeItem('token');
    dispatch({ type: ACTION.LOGOUT });
  };

  const setUserRole = (role) => {
    dispatch({
      type: ACTION.SET_USER_ROLE,
      payload: role,
    });
  };

  return (
    <AuthConext.Provider
      value={{
        user: state.user,
        sub: state.sub,
        userRole: state.userRole,
        login,
        logout,
        setUserRole,
      }}
      {...props}
    />
  );
};

export { AuthConext, AuthProvider };
