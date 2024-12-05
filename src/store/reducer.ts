import { createReducer } from '@reduxjs/toolkit';
import { SortType } from '../components/SortingOptions';
import mocks from '../mocks';
import { Cities, CitiesEnum, Offer } from '../types.d';
import * as Actions from './actions';

type State = {
  city: Cities;
  offers: Offer[];
  favoriteOffers: Offer[];
  sortType: SortType;
};

const initialState: State = {
  city: CitiesEnum.Paris,
  offers: [],
  favoriteOffers: [],
  sortType: SortType.Popular,
};

const sortOffersByType = (offers: Offer[], sortType: SortType): Offer[] => {
  switch (sortType) {
    case SortType.PriceLowToHigh:
      return [...offers].sort((a, b) => a.price - b.price);
    case SortType.PriceHighToLow:
      return [...offers].sort((a, b) => b.price - a.price);
    case SortType.TopRatedFirst:
      return [...offers].sort((a, b) => b.rating - a.rating);
    default:
      return offers;
  }
};

const reducer = createReducer(initialState, (builder) => {
  builder
    .addCase(Actions.getOffers, (state, action) => {
      const filteredOffers = mocks.offers.filter(
        (offer) => offer.city.name === action.payload
      );
      state.offers = sortOffersByType(filteredOffers, state.sortType);
    })
    .addCase(Actions.getFavoriteOffers, (state) => {
      state.favoriteOffers = [mocks.offers[1]];
    })
    .addCase(Actions.changeCity, (state, action) => {
      state.city = action.payload;
    })
    .addCase(Actions.sortOffers, (state, action) => {
      state.sortType = action.payload;
      state.offers = sortOffersByType(state.offers, action.payload);
    });
});

export default reducer;
