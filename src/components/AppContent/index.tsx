import React, { useEffect } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import FavoritesPage from '../../pages/Favorites';
import LoginPage from '../../pages/Login';
import MainPage from '../../pages/Main';
import NotFoundPage from '../../pages/NotFound';
import OfferPage from '../../pages/Offer';
import { useActions } from '../../store/hooks';
import { CitiesEnum, Endpoints } from '../../types.d';
import PrivateRoute from '../PrivateRoute';
import ScrollToTop from '../ScrollToTop';

const AppContent: React.FC = () => {
  const { checkAuth } = useActions();

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  return (
    <BrowserRouter>
      <ScrollToTop />
      <Routes>
        <Route
          path={Endpoints.root}
          element={<MainPage cities={Object.values(CitiesEnum)} />}
        />
        <Route path={Endpoints.login} element={<LoginPage />} />
        <Route
          path={Endpoints.favorites}
          element={
            <PrivateRoute>
              <FavoritesPage />
            </PrivateRoute>
          }
        />
        <Route path={Endpoints['offer/:id']} element={<OfferPage />} />
        <Route path={Endpoints['*']} element={<NotFoundPage />} />
      </Routes>
    </BrowserRouter>
  );
};

export default AppContent;
