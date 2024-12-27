import { configureMockStore } from '@jedmao/redux-mock-store';
import { AnyAction } from '@reduxjs/toolkit';
import MockAdapter from 'axios-mock-adapter';
import thunk from 'redux-thunk';
import { createAPI } from '../services/api';
import { SortType } from '../types/sort';
import { fetchOffers } from './actions';

describe('Async actions', () => {
  const api = createAPI();
  const mockAPI = new MockAdapter(api);
  const middlewares = [thunk.withExtraArgument(api)];
  const mockStore = configureMockStore(middlewares);

  beforeEach(() => {
    mockAPI.reset();
  });

  it('should fetch offers', () => {
    const mockOffers = [
      {
        id: '1',
        title: 'Test offer',
        type: 'apartment',
        price: 100,
        city: {
          name: 'Paris',
          location: {
            latitude: 48.856663,
            longitude: 2.351556,
            zoom: 11,
          },
        },
        isFavorite: false,
        isPremium: false,
        rating: 4,
        previewImage: 'test.jpg',
      },
    ];

    mockAPI.onGet('/offers').reply(200, mockOffers);

    const store = mockStore({
      offers: {
        city: {
          name: 'Paris',
          location: {
            latitude: 48.856663,
            longitude: 2.351556,
            zoom: 11,
          },
        },
        allOffers: [],
        offers: [],
        favoriteOffers: [],
        sortType: SortType.Popular,
        isLoading: false,
        error: null,
      },
    });

    store.dispatch(fetchOffers() as unknown as AnyAction);

    const actions = store.getActions() as {type: string}[];

    expect(actions.map((action) => action.type));
  });
});
