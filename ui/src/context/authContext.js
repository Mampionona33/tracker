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
  setUserTasks: (userTasks) => {},
});

const ACTION = {
  SET_USER_ROLE: 'set-user-role',
  SET_USER_TASKS: 'set-user-tasks',
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

  /* 
    On login, get the tocken from the google api
    and store it to localStorage. The context listen
    to the localStorage and change the initial value 
    of user.
  */
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
    dispatch({ type: 'LOGOUT' });
  };

  const setUserRole = (userRole) => {
    dispatch({ type: ACTION.SET_USER_ROLE, payload: userRole });
  };

  return (
    <AuthContext.Provider
      value={{
        user: state.user,
        userTasks: state.userTasks,
        userRole: state.userRole,
        login,
        logout,
        setUserRole,
      }}
      {...props}
    />
  );
}

export { AuthContext, AuthProvider };
