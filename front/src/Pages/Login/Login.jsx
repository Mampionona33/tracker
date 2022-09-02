import { GoogleLogin } from '@react-oauth/google';
import React, { useContext } from 'react';
import { AuthConext } from '../../context/authContext';
import { LoginContainer, LoginPage } from './Login.style';

const Login = () => {
  const { login } = useContext(AuthConext);

  const logToApp = (response) => {
    login(response.credential);
  };

  console.log('from login', process.env.REACT_APP_GOOGLE_CLIENT_ID);

  return (
    <LoginPage>
      <LoginContainer>
        <h3>Welcome to mampionona task tracker</h3>
        <GoogleLogin
          onSuccess={logToApp}
          onError={(message) => {
            console.log(message);
          }}
        />
      </LoginContainer>
    </LoginPage>
  );
};

export default Login;
