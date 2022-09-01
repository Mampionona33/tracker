import { GoogleLogin } from '@react-oauth/google';
import React, { useContext } from 'react';
import { AuthConext } from '../../context/authContext';
import { LoginContainer, LoginPage } from './Login.style';

const Login = () => {
  const { login } = useContext(AuthConext);

  const logToApp = (response) => {
    login(response.credential);
  };

  return (
    <LoginPage>
      <LoginContainer>
        <h3>Welcome to mampionona task tracker</h3>
        <GoogleLogin data-testid='google-loggin-btn' onSuccess={logToApp} />
      </LoginContainer>
    </LoginPage>
  );
};

export default Login;
