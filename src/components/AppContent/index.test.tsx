import { configureStore } from '@reduxjs/toolkit';
import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import rootReducer, { RootState } from '../../store/reducer';
import { AuthorizationStatus } from '../../types/auth';
import { SortType } from '../../types/sort';
import AppContent from './index';

// Mock window.scrollTo
window.scrollTo = vi.fn(() => {});

interface Offer {
    id: string;
    title: string;
    type: string;
    price: number;
    city: {
        name: string;
        location: {
            latitude: number;
            longitude: number;
            zoom: number;
        };
    };
    location: {
        latitude: number;
        longitude: number;
        zoom: number;
    };
    isFavorite: boolean;
    isPremium: boolean;
    rating: number;
    previewImage: string;
    goods?: string[];
}

describe('AppContent Routing', () => {

  const mockOffer: Offer = {
    id: '1',
    title: 'Beautiful Apartment in Paris',
    type: 'apartment',
    price: 120,
    city: {
      name: 'Paris',
      location: {
        latitude: 48.856663,
        longitude: 2.351556,
        zoom: 11
      }
    },
    location: {
      latitude: 48.856663,
      longitude: 2.351556,
      zoom: 11
    },
    isFavorite: false,
    isPremium: false,
    rating: 4.5,
    previewImage: 'url_to_image.jpg',
    goods: ['Wi-Fi', 'Kitchen', 'Washing Machine']
  };

  const preloadedState: RootState = {
    auth: {
      authorizationStatus: AuthorizationStatus.NoAuth,
      user: null
    },
    offers: {
      city: {
        name: 'Paris',
        location: {
          latitude: 48.856663,
          longitude: 2.351556,
          zoom: 11
        }
      },
      allOffers: [mockOffer],
      offers: [mockOffer],
      favoriteOffers: [],
      sortType: SortType.Popular,
      isLoading: false,
      error: null,
      currentOffer: null,
      isOfferLoading: false,
      offerError: null
    },
    comments: {
      comments: [],
      isCommentsLoading: false,
      commentsError: null
    },
    favorites: {
      favorites: [],
      isLoading: false,
      error: null
    }
  };

  const store = configureStore({
    reducer: rootReducer,
    preloadedState
  });

  it('renders main page by default', () => {
    render(
      <Provider store={store}>
        <AppContent />
      </Provider>
    );

    const placeCount = screen.getByText(/1 places to stay in/i);

    expect(placeCount).toBeInTheDocument();
  });
});
