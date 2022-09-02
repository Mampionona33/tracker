import { GoogleLogin } from '@react-oauth/google';
import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthConext } from '../../context/authContext';
import { LoginContainer, LoginPage } from './Login.style';

const Login = () => {
  const { login } = useContext(AuthConext);
  const navigate = useNavigate();
  const logToApp = (response) => {
    login(response.credential);
    navigate('/dashboard', { replace: true });
  };

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
