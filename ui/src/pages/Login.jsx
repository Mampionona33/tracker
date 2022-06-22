import React, { useContext } from 'react';
import { GoogleLogin } from '@react-oauth/google';
import { AuthContext } from '../context/authContext';
import { useNavigate } from 'react-router-dom';

export default function Login(props) {
  const context = useContext(AuthContext);
  const navigate = useNavigate();

  const handleOnSucces = (response) => {
    const jwt = response.credential;
    context.login(jwt);
    navigate('/dashboard');
  };

  console.log(context.user);

  return (
    <>
      <GoogleLogin onSuccess={(res) => handleOnSucces(res)} />
    </>
  );
}
