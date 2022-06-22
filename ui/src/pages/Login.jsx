import React from 'react';
import { GoogleLogin } from '@react-oauth/google';
import jwt_decode from 'jwt-decode';

export default function Login() {
  const handleOnSucces = (response) => {
    const jwt = response.credential;
    const userObject = jwt_decode(jwt);

    if (userObject) {
      console.log(userObject);
      const sub = userObject.sub;
      const email = userObject.email;
      const name = userObject.name;
      const given_name = userObject.given_name;
      const family_name = userObject.family_name;
      const picture = userObject.picture;
    }
  };

  return (
    <>
      <GoogleLogin onSuccess={(res) => handleOnSucces(res)} />
    </>
  );
}
