import React, { useContext, useState } from 'react';
import { AuthContext } from '../context/authContext';

const RoleBasedRoute = ({ children }) => {
  const context = useContext(AuthContext);
  const [userRole, setUserRole] = useState(null);

  return (
    <div>
      <p>place holder RoleBasedRoute</p>
    </div>
  );
};

export default RoleBasedRoute;
