import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { SortType } from '../../components/SortingOptions';
import { CITIES } from '../../mocks/city';
import type { City, Offer } from '../../types';

type OffersState = {
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

const initialState: OffersState = {
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

export const offersSlice = createSlice({
  name: 'offers',
  initialState,
  reducers: {
    fetchOffersStart: (state) => {
      state.isLoading = true;
      state.error = null;
    },
    fetchOffersSuccess: (state, action: PayloadAction<Offer[]>) => {
      state.allOffers = action.payload;
      state.offers = sortOffersByType(
        filterOffersByCity(action.payload, state.city),
        state.sortType
      );
      state.isLoading = false;
    },
    fetchOffersFailure: (state, action: PayloadAction<string>) => {
      state.isLoading = false;
      state.error = action.payload;
    },
    changeCity: (state, action: PayloadAction<City>) => {
      state.city = action.payload;
      state.offers = sortOffersByType(
        filterOffersByCity(state.allOffers, action.payload),
        state.sortType
      );
    },
    sortOffers: (state, action: PayloadAction<SortType>) => {
      state.sortType = action.payload;
      state.offers = sortOffersByType(state.offers, action.payload);
    },
    fetchOfferStart: (state) => {
      state.isOfferLoading = true;
      state.offerError = null;
    },
    fetchOfferSuccess: (state, action: PayloadAction<Offer>) => {
      state.currentOffer = action.payload;
      state.isOfferLoading = false;
    },
    fetchOfferFailure: (state, action: PayloadAction<string>) => {
      state.isOfferLoading = false;
      state.offerError = action.payload;
    },
    updateOfferFavoriteStatus: (
      state,
      action: PayloadAction<{ offerId: string; isFavorite: boolean }>
    ) => {
      const { offerId, isFavorite } = action.payload;
      const offer = state.allOffers.find((o) => o.id === offerId);
      if (offer) {
        offer.isFavorite = isFavorite;
      }
      state.offers = state.offers.map((o) =>
        o.id === offerId ? { ...o, isFavorite } : o
      );
      if (state.currentOffer?.id === offerId) {
        state.currentOffer.isFavorite = isFavorite;
      }
    },
  },
});

export const {
  fetchOffersStart,
  fetchOffersSuccess,
  fetchOffersFailure,
  changeCity,
  sortOffers,
  fetchOfferStart,
  fetchOfferSuccess,
  fetchOfferFailure,
  updateOfferFavoriteStatus,
} = offersSlice.actions;

export default offersSlice.reducer;
