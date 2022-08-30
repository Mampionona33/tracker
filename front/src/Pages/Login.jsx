import React from 'react';
import { LoginContainer, LoginPage } from './styles/Login.style';
import GoogleButton from 'react-google-button'

const Login = () => {
  const responsGoogle = (respons) => {
    console.log(respons);
  };

  return (
    <LoginPage>
      <LoginContainer>
        <h3>Welcome to mampionona task tracker</h3>
        <GoogleButton/>
      </LoginContainer>
    </LoginPage>
  );
};

export default Login;
