import React from 'react';
import { GoogleLogin } from '@react-oauth/google';
import jwt_decode from 'jwt-decode';
import { useAuth } from '../auth/auth-context';

export default function Login() {
  const { signIn } = useAuth();

  const handleOnSucces = (response) => {
    const jwt = response.credential;
    const userObject = jwt_decode(jwt);

    if (userObject) {
      const sub = userObject.sub;
      const email = userObject.email;
      const name = userObject.name;
      console.log(userObject);
      signIn(email);
    }
  };

  return (
    <>
      <GoogleLogin onSuccess={(res) => handleOnSucces(res)} />
    </>
  );
}
