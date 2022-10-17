import React from 'react';
import { Navigate, Outlet, useLocation } from 'react-router-dom';

const PrivateOutlet = (props) => {
  const location = useLocation();

  return localStorage.getItem('token') ? (
    <Outlet />
  ) : (
    <Navigate to="/login" state={{ from: location.pathname }} replace />
  );
};

export default PrivateOutlet;
