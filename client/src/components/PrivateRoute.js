import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../contexts/authContext';

const PrivateRoute = ({ children }) => {
  const { userLoggedIn, loading } = useAuth();

  if (loading) {
    return <div>Loading...</div>; 
  }

  return userLoggedIn ? children : <Navigate to="/login" />;
};

export default PrivateRoute;
