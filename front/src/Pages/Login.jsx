import React from 'react';
import { LoginContainer, LoginPage } from './styles/Login.style';

const Login = () => {
  const responsGoogle = (respons) => {
    console.log(respons);
  };

  return (
    <LoginPage>
      <LoginContainer>
        <h3>Welcome to mampionona task tracker</h3>
      </LoginContainer>
    </LoginPage>
  );
};

export default Login;
