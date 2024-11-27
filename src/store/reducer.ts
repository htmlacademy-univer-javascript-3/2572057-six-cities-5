import {createReducer} from '@reduxjs/toolkit';
import { Offer, Cities, CitiesEnum } from '../types.d';
import * as Actions from './actions';
import mocks from '../mocks';

type State = {
  city: Cities;
  offers: Offer[];
  favoriteOffers: Offer[];
}

const initialState: State = {
  city: CitiesEnum.Paris,
  offers: [],
  favoriteOffers: []
};

const reducer = createReducer(initialState, (builder) => {
  builder
    .addCase(Actions.getOffers, (state, action) => {
      const filteredOffers = mocks.offers.filter((offer) => offer.city.name === action.payload);

      state.offers = filteredOffers;
    })
    .addCase(Actions.getFavoriteOffers, (state) => {
      state.favoriteOffers = [mocks.offers[1]];
    })
    .addCase(Actions.changeCity, (state, action) => {
      state.city = action.payload;
    });
}
);

export default reducer;
