import React from 'react';
import { Navigate } from 'react-router-dom';

type PrivateRouteProps = {
  children: JSX.Element;
  isAuthenticated: boolean;
};

const PrivateRoute: React.FC<PrivateRouteProps> = ({ children, isAuthenticated }) => isAuthenticated ? children : <Navigate to="/login" />;

export default PrivateRoute;
