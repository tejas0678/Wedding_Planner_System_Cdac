import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

const ProtectedRoute = ({ allowedRoles = [], children }) => {
  const token = localStorage.getItem('authToken');

  // 1. If user is not logged in, redirect to login page
  if (!token) {
    return <Navigate to="/login" replace />;
  }

  // 2. Render protected content for logged in users
  return children ? children : <Outlet />;
};

export default ProtectedRoute;
