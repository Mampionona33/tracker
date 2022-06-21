import React, { useContext } from 'react';
import { GoogleLogin } from '@react-oauth/google';
import jwt_decode from 'jwt-decode';
import { UserContext } from '../auth/auth-context';

export default function Login() {
  const { setUser } = useContext(UserContext);

  const handleOnSucces = (response) => {
    const jwt = response.credential;
    const userObject = jwt_decode(jwt);
    console.log(userObject);
    setUser(userObject);
  };

  return (
    <>
      <GoogleLogin onSuccess={(res) => handleOnSucces(res)} />
    </>
  );
}
