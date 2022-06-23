import React, { useContext } from 'react';
import { GoogleLogin } from '@react-oauth/google';
import { AuthContext } from '../context/authContext';
import { useNavigate } from 'react-router-dom';
import '../style/Login.scss';
import { componentContext } from '../context/componentContext';

export default function Login(props) {
  // import context from AuthContext
  // then use it inside the handleOnSuccess methode
  // with context.login(jwt)
  // where jwt is the token given by google auth
  // after the user is sign in
  const context = useContext(AuthContext);
  const ComponentContext = useContext(componentContext);
  const navigate = useNavigate();

  const handleOnSucces = (response) => {
    const jwt = response.credential;
    context.login(jwt);
    navigate('/dashboard');
  };

  return (
    <div className='login'>
      <div className='login__container'>
        <h3 className='login__title'>Welcom to Mampionona Task Tracker</h3>
        <GoogleLogin onSuccess={(res) => handleOnSucces(res)} />
      </div>
    </div>
  );
}
