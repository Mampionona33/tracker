import { signInWithPopup } from 'firebase/auth';
import React from 'react';
import GoogleButton from 'react-google-button';
import { auth, googleProvider } from '../firebase/firebase';

export default function Login(params) {
  const handleClickLogin = (event) => {
    event.preventDefault();
    signInWithPopup(auth, googleProvider).then((result) => {
      console.log(result);
    });
  };
  return (
    <div className='login'>
      <GoogleButton onClick={(event) => handleClickLogin(event)} />
    </div>
  );
}
