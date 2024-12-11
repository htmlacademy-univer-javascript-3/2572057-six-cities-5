import React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import ScrollToTop from './components/ScrollToTop';
import store from './store';

import PrivateRoute from './components/PrivateRoute';
import FavoritesPage from './pages/Favorites';
import LoginPage from './pages/Login';
import MainPage from './pages/Main';
import NotFoundPage from './pages/NotFound';
import OfferPage from './pages/Offer';

import { CitiesEnum, Endpoints } from './types.d';

const isAuthenticated = true; // login mock

const App: React.FC = () => (
  <Provider store={store}>
    <BrowserRouter>
      <ScrollToTop />
      <Routes>
        <Route path={Endpoints.root} element={<MainPage cities={Object.values(CitiesEnum)} />} />
        <Route path={Endpoints.login} element={<LoginPage />} />
        <Route
          path={Endpoints.favorites}
          element={
            <PrivateRoute isAuthenticated={isAuthenticated}>
              <FavoritesPage />
            </PrivateRoute>
          }
        />
        <Route path={Endpoints['offer/:id']} element={<OfferPage />} />
        <Route path={Endpoints['*']} element={<NotFoundPage />} />
      </Routes>
    </BrowserRouter>
  </Provider>
);

export default App;
