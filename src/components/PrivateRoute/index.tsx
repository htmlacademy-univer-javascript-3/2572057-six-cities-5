import React from 'react';
import { Navigate } from 'react-router-dom';

import { Endpoints } from '../../types.d';

type PrivateRouteProps = {
  children: JSX.Element;
  isAuthenticated: boolean;
};

const PrivateRoute: React.FC<PrivateRouteProps> = ({ children, isAuthenticated }) => isAuthenticated ? children : <Navigate to={Endpoints.login} />;

export default PrivateRoute;
