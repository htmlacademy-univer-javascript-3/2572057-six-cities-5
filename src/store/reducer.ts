import { createReducer } from '@reduxjs/toolkit';
import { SortType } from '../components/SortingOptions';
import { CITIES } from '../mocks/city';
import { City, Offer } from '../types.d';
import * as Actions from './actions';

type State = {
  city: City;
  allOffers: Offer[];
  offers: Offer[];
  favoriteOffers: Offer[];
  sortType: SortType;
  isLoading: boolean;
  error: string | null;
  currentOffer: Offer | null;
  isOfferLoading: boolean;
  offerError: string | null;
};

const initialState: State = {
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

const filterOffersByCity = (offers: Offer[], city: City): Offer[] =>
  offers.filter((offer) => offer.city.name === city.name);

const reducer = createReducer(initialState, (builder) => {
  builder
    .addCase(Actions.fetchOffersStart, (state) => {
      state.isLoading = true;
      state.error = null;
    })
    .addCase(Actions.fetchOffersSuccess, (state, action) => {
      state.allOffers = action.payload;
      state.offers = sortOffersByType(
        filterOffersByCity(action.payload, state.city),
        state.sortType
      );
      state.isLoading = false;
    })
    .addCase(Actions.fetchOffersFailure, (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    })
    .addCase(Actions.changeCity, (state, action) => {
      state.city = action.payload;
      state.offers = sortOffersByType(
        filterOffersByCity(state.allOffers, action.payload),
        state.sortType
      );
    })
    .addCase(Actions.sortOffers, (state, action) => {
      state.sortType = action.payload;
      state.offers = sortOffersByType(state.offers, action.payload);
    })
    .addCase(Actions.fetchOfferStart, (state) => {
      state.isOfferLoading = true;
      state.offerError = null;
    })
    .addCase(Actions.fetchOfferSuccess, (state, action) => {
      state.currentOffer = action.payload;
      state.isOfferLoading = false;
    })
    .addCase(Actions.fetchOfferFailure, (state, action) => {
      state.isOfferLoading = false;
      state.offerError = action.payload;
    });
});

export default reducer;
