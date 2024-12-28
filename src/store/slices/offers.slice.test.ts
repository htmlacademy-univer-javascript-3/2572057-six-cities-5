import { SortType } from '../../components/SortingOptions';
import { CITIES } from '../../mocks/city';
import type { Offer } from '../../types';
import offersReducer, {
  changeCity,
  fetchOffersFailure,
  fetchOffersStart,
  fetchOffersSuccess,
  sortOffers,
  updateOfferFavoriteStatus,
} from './offers.slice';

describe('offers reducer', () => {
  const initialState = {
    city: CITIES.Paris,
    allOffers: [],
    offers: [],
    favoriteOffers: [],
    sortType: SortType.Popular,
    isLoading: false,
    error: null,
    currentOffer: null,
    isOfferLoading: false,
    offerError: null,
  };

  const mockOffers: Offer[] = [
    {
      id: '1',
      title: 'Test offer 1',
      type: 'apartment',
      price: 100,
      city: CITIES.Paris,
      location: {
        latitude: 48.856663,
        longitude: 2.351556,
        zoom: 11,
      },
      isFavorite: false,
      isPremium: false,
      rating: 4,
      previewImage: 'test.jpg',
    },
    {
      id: '2',
      title: 'Test offer 2',
      type: 'apartment',
      price: 200,
      city: CITIES.Amsterdam,
      location: {
        latitude: 52.37403,
        longitude: 4.88969,
        zoom: 10,
      },
      isFavorite: false,
      isPremium: true,
      rating: 5,
      previewImage: 'test2.jpg',
    },
  ];

  it('should handle initial state', () => {
    expect(offersReducer(undefined, { type: 'unknown' })).toEqual(initialState);
  });

  it('should handle fetchOffersStart', () => {
    const actual = offersReducer(initialState, fetchOffersStart());
    expect(actual.isLoading).toBe(true);
    expect(actual.error).toBeNull();
  });

  it('should handle fetchOffersSuccess', () => {
    const actual = offersReducer(initialState, fetchOffersSuccess(mockOffers));
    expect(actual.isLoading).toBe(false);
    expect(actual.allOffers).toEqual(mockOffers);
    // Should only include offers from current city (Paris)
    expect(actual.offers).toHaveLength(1);
    expect(actual.offers[0].id).toBe('1');
  });

  it('should handle fetchOffersFailure', () => {
    const errorMessage = 'Failed to fetch';
    const actual = offersReducer(
      initialState,
      fetchOffersFailure(errorMessage)
    );
    expect(actual.isLoading).toBe(false);
    expect(actual.error).toBe(errorMessage);
  });

  it('should handle changeCity', () => {
    const state = {
      ...initialState,
      allOffers: mockOffers,
    };
    const actual = offersReducer(state, changeCity(CITIES.Amsterdam));
    expect(actual.city).toEqual(CITIES.Amsterdam);
    expect(actual.offers).toHaveLength(1);
    expect(actual.offers[0].id).toBe('2');
  });

  it('should handle sortOffers', () => {
    const state = {
      ...initialState,
      offers: mockOffers,
    };

    const actual = offersReducer(state, sortOffers(SortType.PriceHighToLow));
    expect(actual.sortType).toBe(SortType.PriceHighToLow);
    expect(actual.offers[0].price).toBe(200);
  });

  it('should handle updateOfferFavoriteStatus', () => {
    const state = {
      ...initialState,
      allOffers: mockOffers,
      offers: [mockOffers[0]],
    };

    const actual = offersReducer(
      state,
      updateOfferFavoriteStatus({ offerId: '1', isFavorite: true })
    );

    expect(actual.allOffers[0].isFavorite).toBe(true);
    expect(actual.offers[0].isFavorite).toBe(true);
  });
});
