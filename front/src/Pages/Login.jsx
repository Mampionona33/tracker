import React from 'react';
import { GoogleLogin } from 'react-google-login';

const Login = () => {
  const responsGoogle = (respons) => {
    console.log(respons);
  };

  return (
    <div>
      <h3>Welcome to mampionona task tracker</h3>
      <GoogleLogin
        clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}
        isSignedIn={true}
        onSuccess={responsGoogle}
      />
    </div>
  );
};

export default Login;
