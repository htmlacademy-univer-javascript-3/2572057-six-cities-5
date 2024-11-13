import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import PrivateRoute from './components/PrivateRoute';
import MainPage from './pages/Main';
import LoginPage from './pages/Login';
import FavoritesPage from './pages/Favorites';
import OfferPage from './pages/Offer';
import NotFoundPage from './pages/NotFound';

import { Mocks } from './mocks';
import { Endpoints } from './types.d';

type AppProps = {
  offersCount: number;
  mocks: Mocks;
};

const isAuthenticated = false; // login mock

const App: React.FC<AppProps> = ({offersCount, mocks}) => (
  <BrowserRouter>
    <Routes>
      <Route path={Endpoints.root} element={<MainPage offersCount={offersCount} offers={mocks.offers}/>}/>
      <Route path={Endpoints.login} element={<LoginPage />} />
      <Route
        path={Endpoints.favorites}
        element={
          <PrivateRoute isAuthenticated={isAuthenticated}>
            <FavoritesPage offers={mocks.offers} />
          </PrivateRoute>
        }
      />
      <Route path={Endpoints['offer/:id']} element={<OfferPage />} />

      <Route path={Endpoints['*']} element={<NotFoundPage />} />
    </Routes>
  </BrowserRouter>
);

export default App;
