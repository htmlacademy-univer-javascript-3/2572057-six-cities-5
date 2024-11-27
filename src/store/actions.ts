import { createAction } from '@reduxjs/toolkit';
import { Cities } from '../types';

const Actions = {
  getOffers: 'get-offers',
  getFavoritesOffers: 'get-favorite-offers',
  changeCity: 'change-city'
} as const;

export const getOffers = createAction<Cities>(Actions.getOffers);

export const getFavoriteOffers = createAction(Actions.getFavoritesOffers);

export const changeCity = createAction<Cities>(Actions.changeCity);
