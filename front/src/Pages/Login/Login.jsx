import { GoogleLogin } from '@react-oauth/google';
import React from 'react';
import { LoginContainer, LoginPage } from './Login.style';

const Login = () => {
  const loggin = (credentialResponse) => {
    console.log(credentialResponse);
  };

  return (
    <LoginPage>
      <LoginContainer>
        <h3>Welcome to mampionona task tracker</h3>
        <GoogleLogin data-testid='google-loggin-btn' onSuccess={loggin} />
      </LoginContainer>
    </LoginPage>
  );
};

export default Login;
