import { signInWithPopup } from 'firebase/auth';
import React from 'react';
import GoogleButton from 'react-google-button';
import { auth, googleProvider } from '../firebase/firebase';
import getUser from '../graphql/getUser';

export default function Login(params) {
  const handleClickLogin = (event) => {
    event.preventDefault();
    signInWithPopup(auth, googleProvider).then((result) => {
      // console.log(result);
      getUser(result.user.uid)
        .then((data) => {
          console.log(data);
        })
        .catch((error) => {
          console.log(error);
        });
    });
  };

  return (
    <div className='login'>
      <GoogleButton onClick={(event) => handleClickLogin(event)} />
    </div>
  );
}
