import { createSelector } from '@reduxjs/toolkit';
import type { RootState } from './types';

// Base selectors
const getOffersState = (state: RootState) => state.offers;
const getAuthState = (state: RootState) => state.auth;
const getCommentsState = (state: RootState) => state.comments;
const getFavoritesState = (state: RootState) => state.favorites;

// Memoized selectors
export const getCitySelector = createSelector(
  [getOffersState],
  (offers) => offers.city
);

export const getOffersSelector = createSelector(
  [getOffersState],
  (offers) => offers.offers
);

export const getLoadingSelector = createSelector(
  [getOffersState],
  (offers) => offers.isLoading
);

export const getErrorSelector = createSelector(
  [getOffersState],
  (offers) => offers.error
);

export const getCurrentOfferSelector = createSelector(
  [getOffersState],
  (offers) => offers.currentOffer
);

export const getOfferLoadingSelector = createSelector(
  [getOffersState],
  (offers) => offers.isOfferLoading
);

export const getOfferErrorSelector = createSelector(
  [getOffersState],
  (offers) => offers.offerError
);

export const getAllOffersSelector = createSelector(
  [getOffersState],
  (offers) => offers.allOffers
);

export const getAuthorizationStatus = createSelector(
  [getAuthState],
  (auth) => auth.authorizationStatus
);

export const getUser = createSelector([getAuthState], (auth) => auth.user);

export const getCommentsSelector = createSelector(
  [getCommentsState],
  (comments) => comments.comments
);

export const getCommentsLoadingSelector = createSelector(
  [getCommentsState],
  (comments) => comments.isCommentsLoading
);

export const getFavoritesSelector = createSelector(
  [getFavoritesState],
  (favorites) => favorites.favorites
);

export const getFavoritesCountSelector = createSelector(
  [getFavoritesSelector],
  (favorites) => favorites.length
);
