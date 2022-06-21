import React from 'react';
import { GoogleLogin } from '@react-oauth/google';
import jwt_decode from 'jwt-decode';

export default function Login() {
  const handleOnSucces = (response) => {
    const jwt = response.credential;
    const userObject = jwt_decode(jwt);
    console.log(userObject);
  };

  return (
    <>
      <GoogleLogin onSuccess={(res) => handleOnSucces(res)} />
    </>
  );
}
