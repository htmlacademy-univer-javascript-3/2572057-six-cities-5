import type { RootState } from './types';

const getStateSelector = (state: RootState) => state;

export const getCitySelector = (state: RootState) =>
  getStateSelector(state).city;
export const getOffersSelector = (state: RootState) =>
  getStateSelector(state).offers;
export const getLoadingSelector = (state: RootState) =>
  getStateSelector(state).isLoading;
export const getErrorSelector = (state: RootState) =>
  getStateSelector(state).error;
export const getCurrentOfferSelector = (state: RootState) =>
  getStateSelector(state).currentOffer;
export const getOfferLoadingSelector = (state: RootState) =>
  getStateSelector(state).isOfferLoading;
export const getOfferErrorSelector = (state: RootState) =>
  getStateSelector(state).offerError;
export const getAllOffersSelector = (state: RootState) =>
  getStateSelector(state).allOffers;
export const getAuthorizationStatus = (state: RootState) =>
  getStateSelector(state).authorizationStatus;
export const getUser = (state: RootState) => getStateSelector(state).user;
