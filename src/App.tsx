import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import PrivateRoute from './components/PrivateRoute';
import MainPage from './pages/Main';
import LoginPage from './pages/Login';
import FavoritesPage from './pages/Favorites';
import OfferPage from './pages/Offer';
import NotFoundPage from './pages/NotFound';

import { Mocks } from './mocks';

type AppProps = {
  offersCount: number;
  mocks: Mocks;
};

const isAuthenticated = true; // login mock

const App: React.FC<AppProps> = ({offersCount, mocks}) => (
  <BrowserRouter>
    <Routes>
      <Route path='/' element={<MainPage offersCount={offersCount} offers={mocks.offers}/>}/>
      <Route path="/login" element={<LoginPage />} />
      <Route
        path="/favorites"
        element={
          <PrivateRoute isAuthenticated={isAuthenticated}>
            <FavoritesPage offers={mocks.offers} />
          </PrivateRoute>
        }
      />
      <Route path="/offer/:id" element={<OfferPage />} />

      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  </BrowserRouter>
);

export default App;
