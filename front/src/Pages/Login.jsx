import { GoogleLogin } from '@react-oauth/google';
import React from 'react';
import { LoginContainer, LoginPage } from './Login.style';

const Login = () => {
  const responsGoogle = (respons) => {
    console.log(respons);
  };

  return (
    <LoginPage>
      <LoginContainer>
        <h3>Welcome to mampionona task tracker</h3>
        <GoogleLogin />
      </LoginContainer>
    </LoginPage>
  );
};

export default Login;
