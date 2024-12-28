import { configureStore } from '@reduxjs/toolkit';
import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { SortType } from '../../components/SortingOptions';
import { CITIES } from '../../mocks/city';
import offersReducer from '../../store/slices/offers.slice';
import MainEmpty from './index';

describe('MainEmpty component', () => {
  const store = configureStore({
    reducer: {
      offers: offersReducer
    },
    preloadedState: {
      offers: {
        city: CITIES.Paris,
        allOffers: [],
        offers: [],
        favoriteOffers: [],
        sortType: SortType.Popular,
        isLoading: false,
        error: null,
        currentOffer: null,
        isOfferLoading: false,
        offerError: null
      }
    }
  });

  it('renders correctly with city name', () => {
    render(
      <Provider store={store}>
        <MainEmpty />
      </Provider>
    );

    expect(screen.getByText('No places to stay available')).toBeInTheDocument();
    expect(screen.getByText(/We could not find any property available at the moment in Paris/)).toBeInTheDocument();
  });
});
