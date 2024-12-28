import { configureStore } from '@reduxjs/toolkit';
import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import rootReducer, { RootState } from '../../store/reducer';
import { AuthorizationStatus } from '../../types/auth';
import { SortType } from '../../types/sort';
import PrivateRoute from './index';

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

describe('PrivateRoute', () => {
  const mockChildren = <div>Protected Content</div>;

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

  const renderWithRedux = (authStatus: AuthorizationStatus) => {
    const store = configureStore({
      reducer: rootReducer,
      preloadedState: {
        ...preloadedState,
        auth: {
          ...preloadedState.auth,
          authorizationStatus: authStatus
        }
      }
    });

    return render(
      <Provider store={store}>
        <MemoryRouter>
          <PrivateRoute>{mockChildren}</PrivateRoute>
        </MemoryRouter>
      </Provider>
    );
  };

  it('should render children when authenticated', () => {
    renderWithRedux(AuthorizationStatus.Auth);
    expect(screen.getByText('Protected Content')).toBeInTheDocument();
  });

  it('should redirect when not authenticated', () => {
    renderWithRedux(AuthorizationStatus.NoAuth);
    expect(screen.queryByText('Protected Content')).not.toBeInTheDocument();
  });
});
