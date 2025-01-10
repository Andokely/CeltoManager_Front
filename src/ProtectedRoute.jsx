import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from './AuthContext';

const ProtectedRoute = ({ children, requiredRole }) => {
  const { user } = useAuth();
  
  const requiredRoles = Array.isArray(requiredRole) ? requiredRole : [requiredRole];
  
  const isAuthorized = user && requiredRoles.includes(user.role);

  if (!isAuthorized) {
    return <Navigate to="/no-access" />;
  }

  return children;
};

export default ProtectedRoute;

