// src/components/ProtectedRoute.js
import React from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ element: Component, isAuthenticated, ...rest }) => {
  const isAuth = isAuthenticated || localStorage.getItem('isAuthenticated') === 'true';
  return isAuth ? <Component {...rest} /> : <Navigate to="/otherlogin" />;
};

export default ProtectedRoute;
