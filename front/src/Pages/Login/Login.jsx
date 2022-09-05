import { GoogleLogin } from '@react-oauth/google';
import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import Card from '../../Components/Card/Card';
import { AuthConext } from '../../context/authContext';
import {
  LoginCardContainer,
  LoginPage,
  LoginCard,
  LoginTitle,
} from './Login.style';

const Login = () => {
  const { login } = useContext(AuthConext);
  const navigate = useNavigate();
  const logToApp = (response) => {
    login(response.credential);
    navigate('/dashboard', { replace: true });
  };

  return (
    <LoginPage>
      <LoginCardContainer>
        <Card>
          <LoginCard>
            <LoginTitle>Welcome to mampionona task tracker</LoginTitle>
            <GoogleLogin
              onSuccess={logToApp}
              onError={(message) => {
                console.log(message);
              }}
            />
          </LoginCard>
        </Card>
      </LoginCardContainer>
    </LoginPage>
  );
};

export default Login;
