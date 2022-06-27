import React, { createContext, useReducer } from 'react';
import jwtDecode from 'jwt-decode';

// set initial user state to null
const initialState = {
  user: null,
  userRole: null,
};

// check if there is item with the key token in the localstorage
if (localStorage.getItem('token')) {
  // if there is token in local storage.
  // Decode it with jwDecode
  const decodedToken = jwtDecode(localStorage.getItem('token'));
  const sub = decodedToken.sub;

  // if there is token,
  // verify the expiration of the token.
  //  if it is less than data now, remove it
  if (decodedToken.exp * 1000 < Date.now()) {
    localStorage.removeItem('token');
  } else {
    initialState.user = decodedToken;
  }
}

// create context with initial state
const AuthContext = createContext({
  user: null,
  userRole: null,
  login: (userData) => {},
  logout: () => {},
  setUserRole: (userRole) => {},
});

const ACTION = {
  SET_USER_ROLE: 'set-user-role',
};

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
    case ACTION.SET_USER_ROLE: {
      return {
        ...state,
        userRole: (state.userRole = action.payload),
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
    // reload the page to get all initial state works
    window.location.reload();
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

  const setUserRole = (userRole) => {
    dispatch({ type: ACTION.SET_USER_ROLE, payload: userRole });
  };

  return (
    <AuthContext.Provider
      value={{
        user: state.user,
        login,
        logout,
        setUserRole,
        userRole: state.userRole,
      }}
      {...props}
    />
  );
}

export { AuthContext, AuthProvider };
