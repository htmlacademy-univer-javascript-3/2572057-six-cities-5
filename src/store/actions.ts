import { createAction } from '@reduxjs/toolkit';
import { SortType } from '../components/SortingOptions';
import { Cities } from '../types';

const Actions = {
  getOffers: 'get-offers',
  getFavoritesOffers: 'get-favorite-offers',
  changeCity: 'change-city',
  sortOffers: 'sort-offers',
} as const;

export const getOffers = createAction<Cities>(Actions.getOffers);

export const getFavoriteOffers = createAction(Actions.getFavoritesOffers);

export const changeCity = createAction<Cities>(Actions.changeCity);

export const sortOffers = createAction<SortType>(Actions.sortOffers);
