import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAppSelector } from '../../store/hooks';
import { getAuthorizationStatus } from '../../store/selectors';
import { Endpoints } from '../../types.d';
import { AuthorizationStatus } from '../../types/auth';

type PrivateRouteProps = {
  children: JSX.Element;
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({ children }) => {
  const authorizationStatus = useAppSelector(getAuthorizationStatus);

  return authorizationStatus === AuthorizationStatus.Auth ? (
    children
  ) : (
    <Navigate to={Endpoints.login} />
  );
};

export default PrivateRoute;
