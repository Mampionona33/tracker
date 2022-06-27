import React, { useContext, useEffect, useState } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import { AuthContext } from '../context/authContext';
import { componentContext } from '../context/componentContext';
import Navbar from './../components/Navbar';
import { gql, useQuery } from '@apollo/client';

const GET_USER_ROLE = gql`
  query SearchUser($input: UserIdInput) {
    searchUser(input: $input) {
      role
    }
  }
`;

export default function ProtectedRoute({ children }) {
  const context = useContext(AuthContext);
  const ComponentContext = useContext(componentContext);

  const { data, loading, error } = useQuery(GET_USER_ROLE, {
    variables: {
      input: {
        sub: context.user && context.user.sub,
      },
    },
  });

  if (!context.user) {
    return <Navigate to={'/login'} replace={true} />;
  }

  useEffect(() => {
    if (context.user && data && data.searchUser[0]) {
      console.log(data.searchUser[0].role);
    }
  }, [data]);

  return (
    <>
      <Navbar />
      {ComponentContext.sideBar && <Sidebar />}
      {children ? children : <Outlet />}
    </>
  );
}
