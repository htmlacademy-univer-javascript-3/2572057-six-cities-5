import React from 'react';
import { Link } from 'react-router-dom';
import { useActions, useAppSelector } from '../../store/hooks';
import { getAuthorizationStatus, getUser } from '../../store/selectors';
import { Endpoints } from '../../types.d';
import { AuthorizationStatus } from '../../types/auth';

const Header: React.FC = () => {
  const authorizationStatus = useAppSelector(getAuthorizationStatus);
  const user = useAppSelector(getUser);
  const { logoutAction } = useActions();

  const handleSignOut = () => {
    try {
      logoutAction();
    } catch (error) {
    //   console.error('Logout failed:', error);
    }
  };

  const renderUserBlock = () => {
    if (authorizationStatus === AuthorizationStatus.Auth && user) {
      return (
        <>
          <li className="header__nav-item user">
            <Link
              className="header__nav-link header__nav-link--profile"
              to={Endpoints.favorites}
            >
              <div className="header__avatar-wrapper user__avatar-wrapper" />
              <span className="header__user-name user__name">
                {user.email}
              </span>
            </Link>
          </li>
          <Link
            className="header__nav-link"
            to={Endpoints.favorites}
          >
            <span className="header__favorite-count" style={{ marginLeft: '0px', marginRight: '25px' }}>3</span>
          </Link>
          <li className="header__nav-item">
            <Link
              className="header__nav-link"
              to={Endpoints.root}
              onClick={handleSignOut}
            >
              <span className="header__signout">Sign out</span>
            </Link>
          </li>
        </>
      );
    }

    return (
      <li className="header__nav-item user">
        <Link
          className="header__nav-link header__nav-link--profile"
          to={Endpoints.login}
        >
          <div className="header__avatar-wrapper user__avatar-wrapper" />

          <span className="header__login">Sign in</span>
        </Link>
      </li>
    );
  };

  return (
    <header className="header">
      <div className="container">
        <div className="header__wrapper">
          <div className="header__left">
            <Link className="header__logo-link" to={Endpoints.root}>
              <img
                className="header__logo"
                src="img/logo.svg"
                alt="6 cities logo"
                width="81"
                height="41"
              />
            </Link>
          </div>
          <nav className="header__nav">
            <ul className="header__nav-list">
              {renderUserBlock()}
            </ul>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;
