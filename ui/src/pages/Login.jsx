import React from 'react';
import { GoogleLogin } from '@react-oauth/google';

export default function Login(params) {
  return (
    <>
      <GoogleLogin
        onSuccess={(credentialResponse) => console.log(credentialResponse)}
      />
    </>
  );
}
