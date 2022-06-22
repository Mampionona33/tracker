import React, { useContext } from 'react';
import { GoogleLogin } from '@react-oauth/google';
import jwt_decode from 'jwt-decode';
import { AuthContext } from '../context/authContext';
import { gql, useMutation } from '@apollo/client';
import { useNavigate } from 'react-router-dom';

const LOGIN_USER = gql`
  mutation login($loginInput: LoginInput) {
    loginUser(loginInput: $loginInput) {
      token
    }
  }
`;

export default function Login() {
  const context = useContext(AuthContext);
  const navigate = useNavigate();
  
  const [loginUser, { loading }] = useMutation(LOGIN_USER, {
    update(proxy, { data: userData }) {
      context.login(userData);
      navigate('/dashboard');
    },
  });

  const handleOnSucces = (response) => {
    const jwt = response.credential;
    loginUser();
  };

  return (
    <>
      <GoogleLogin onSuccess={(res) => handleOnSucces(res)} />
    </>
  );
}
