import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { Offer } from '../../types';

type FavoritesState = {
  favorites: Offer[];
  isLoading: boolean;
  error: string | null;
};

const initialState: FavoritesState = {
  favorites: [],
  isLoading: false,
  error: null,
};

export const favoritesSlice = createSlice({
  name: 'favorites',
  initialState,
  reducers: {
    fetchFavoritesStart: (state) => {
      state.isLoading = true;
      state.error = null;
    },
    fetchFavoritesSuccess: (state, action: PayloadAction<Offer[]>) => {
      state.favorites = action.payload.filter((offer) => offer.isFavorite);
      state.isLoading = false;
    },
    fetchFavoritesFailure: (state, action: PayloadAction<string>) => {
      state.isLoading = false;
      state.error = action.payload;
    },
    addToFavorites: (state, action: PayloadAction<Offer>) => {
      const existingIndex = state.favorites.findIndex(
        (offer) => offer.id === action.payload.id
      );
      if (existingIndex === -1) {
        state.favorites.push({
          ...action.payload,
          isFavorite: true,
        });
      }
    },
    removeFromFavorites: (state, action: PayloadAction<string>) => {
      state.favorites = state.favorites.filter(
        (offer) => offer.id !== action.payload
      );
      state.isLoading = false;
    },
  },
});

export const {
  fetchFavoritesStart,
  fetchFavoritesSuccess,
  fetchFavoritesFailure,
  addToFavorites,
  removeFromFavorites,
} = favoritesSlice.actions;

export default favoritesSlice.reducer;
