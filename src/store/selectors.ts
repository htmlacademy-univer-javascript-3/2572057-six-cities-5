import type { RootState } from './types';

const getStateSelector = (state: RootState) => state;

export const getCitySelector = (state: RootState) => getStateSelector(state).city;
export const getOffersSelector = (state: RootState) => getStateSelector(state).offers;
export const getFavoritesOffersSelector = (state: RootState) => getStateSelector(state).favoriteOffers;
