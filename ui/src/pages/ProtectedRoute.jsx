import React, { useContext, useEffect, useState } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import { AuthContext } from '../context/authContext';
import { componentContext } from '../context/componentContext';
import Navbar from './../components/Navbar';
import { gql } from '@apollo/client';

const GET_USER_ROLE = gql`
  query SearchUser($input: UserIdInput) {
    searchUser(input: $input) {
      role
      email
      aud
      azp
      email_verified
      exp
      given_name
      family_name
      iat
      iss
      jti
      name
      nbf
      picture
      sub
    }
  }
`;

export default function ProtectedRoute({ children }) {
  const context = useContext(AuthContext);
  const ComponentContext = useContext(componentContext);

  if (!context.user) {
    return <Navigate to={'/login'} replace={true} />;
  }

  return (
    <>
      <Navbar />
      {ComponentContext.sideBar && <Sidebar />}
      {children ? children : <Outlet />}
    </>
  );
}
