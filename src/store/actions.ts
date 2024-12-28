import { createAsyncThunk } from '@reduxjs/toolkit';
import { AxiosInstance } from 'axios';
import { dropToken, saveToken } from '../services/token';
import type { Offer } from '../types';
import type { AuthData, UserData } from '../types/auth';
import { AuthorizationStatus } from '../types/auth';
import type { Comment, CommentData } from '../types/comment';
import { authSlice } from './slices/auth.slice';
import { commentsSlice } from './slices/comments.slice';
import { favoritesSlice } from './slices/favorites.slice';
import { offersSlice } from './slices/offers.slice';
import { AppDispatch, RootState } from './types';

// Destructure actions from slices
const {
  fetchOffersStart,
  fetchOffersSuccess,
  fetchOffersFailure,
  fetchOfferStart,
  fetchOfferSuccess,
  fetchOfferFailure,
  changeCity,
  sortOffers,
  updateOfferFavoriteStatus,
} = offersSlice.actions;

const {
  requireAuthorization,
  setUser,
  logout: logoutAction,
} = authSlice.actions;

const { fetchCommentsStart, fetchCommentsSuccess, fetchCommentsFailure } =
  commentsSlice.actions;

const {
  fetchFavoritesStart,
  fetchFavoritesSuccess,
  fetchFavoritesFailure,
  addToFavorites,
  removeFromFavorites,
} = favoritesSlice.actions;

// Async thunks
export const fetchOffers = createAsyncThunk<
  void,
  undefined,
  {
    dispatch: AppDispatch;
    state: RootState;
    extra: AxiosInstance;
  }
>('offers/fetchOffers', async (_, { dispatch, extra: api }) => {
  dispatch(fetchOffersStart());
  try {
    const response = await api.get<Offer[]>('/offers');
    dispatch(fetchOffersSuccess(response.data));
  } catch (error) {
    const message =
      error instanceof Error ? error.message : 'Failed to load offers';
    dispatch(fetchOffersFailure(message));
  }
});

export const fetchOffer = createAsyncThunk<
  void,
  string,
  {
    dispatch: AppDispatch;
    state: RootState;
    extra: AxiosInstance;
  }
>('offer/fetch', async (id, { dispatch, extra: api }) => {
  try {
    dispatch(fetchOfferStart());
    const { data } = await api.get<Offer>(`/offers/${id}`);
    dispatch(fetchOfferSuccess(data));
  } catch (error) {
    const message =
      error instanceof Error ? error.message : 'Failed to load offer';
    dispatch(fetchOfferFailure(message));
    throw error;
  }
});

export const checkAuth = createAsyncThunk<
  void,
  undefined,
  {
    dispatch: AppDispatch;
    state: RootState;
    extra: AxiosInstance;
  }
>('user/checkAuth', async (_arg, { dispatch, extra: api }) => {
  try {
    const { data } = await api.get<UserData>('/login');
    dispatch(requireAuthorization(AuthorizationStatus.Auth));
    dispatch(setUser(data));
  } catch {
    dispatch(requireAuthorization(AuthorizationStatus.NoAuth));
  }
});

export const login = createAsyncThunk<
  void,
  AuthData,
  {
    dispatch: AppDispatch;
    state: RootState;
    extra: AxiosInstance;
  }
>(
  'user/login',
  async ({ login: email, password }, { dispatch, extra: api }) => {
    try {
      const { data } = await api.post<UserData>('/login', { email, password });
      saveToken(data.token);
      dispatch(requireAuthorization(AuthorizationStatus.Auth));
      dispatch(setUser(data));
    } catch (error) {
      dispatch(requireAuthorization(AuthorizationStatus.NoAuth));
      throw error;
    }
  }
);

export const logout = createAsyncThunk<
  void,
  undefined,
  {
    dispatch: AppDispatch;
    state: RootState;
    extra: AxiosInstance;
  }
>('user/logout', async (_arg, { dispatch, extra: api }) => {
  try {
    await api.delete('/logout');
    dropToken();
    dispatch(requireAuthorization(AuthorizationStatus.NoAuth));
    dispatch(logoutAction());
  } catch (error) {
    dropToken();
    dispatch(requireAuthorization(AuthorizationStatus.NoAuth));
    dispatch(logoutAction());
    throw error;
  }
});

export const fetchComments = createAsyncThunk<
  void,
  string,
  {
    dispatch: AppDispatch;
    state: RootState;
    extra: AxiosInstance;
  }
>('comments/fetch', async (offerId, { dispatch, extra: api }) => {
  try {
    dispatch(fetchCommentsStart());
    const { data } = await api.get<Comment[]>(`/comments/${offerId}`);
    dispatch(fetchCommentsSuccess(data));
  } catch (error) {
    dispatch(
      fetchCommentsFailure(
        error instanceof Error ? error.message : 'Failed to load comments'
      )
    );
  }
});

export const postComment = createAsyncThunk<
  void,
  { offerId: string; commentData: CommentData },
  {
    dispatch: AppDispatch;
    state: RootState;
    extra: AxiosInstance;
  }
>(
  'comments/post',
  async ({ offerId, commentData }, { dispatch, extra: api }) => {
    await api.post(`/comments/${offerId}`, commentData);
    const { data } = await api.get<Comment[]>(`/comments/${offerId}`);
    dispatch(fetchCommentsSuccess(data));
  }
);

export const fetchFavorites = createAsyncThunk<
  void,
  undefined,
  {
    dispatch: AppDispatch;
    state: RootState;
    extra: AxiosInstance;
  }
>('favorites/fetch', async (_arg, { dispatch, extra: api }) => {
  try {
    dispatch(fetchFavoritesStart());
    const { data } = await api.get<Offer[]>('/favorite');
    const favorites = data.filter((offer) => offer.isFavorite);
    dispatch(fetchFavoritesSuccess(favorites));
  } catch (error) {
    dispatch(
      fetchFavoritesFailure(
        error instanceof Error ? error.message : 'Failed to load favorites'
      )
    );
  }
});

export const toggleFavorite = createAsyncThunk<
  void,
  { offerId: string; status: number },
  {
    dispatch: AppDispatch;
    state: RootState;
    extra: AxiosInstance;
  }
>('favorites/toggle', async ({ offerId, status }, { dispatch, extra: api }) => {
  const { data } = await api.post<Offer>(`/favorite/${offerId}/${status}`);

  // Update offer status in all relevant places
  dispatch(
    updateOfferFavoriteStatus({
      offerId,
      isFavorite: status === 1,
    })
  );

  // Update favorites list
  if (status === 1) {
    dispatch(addToFavorites(data));
  } else {
    dispatch(removeFromFavorites(offerId));
  }

  // Refresh favorites list to ensure consistency
  dispatch(fetchFavorites());

});

// Re-export actions from slices for direct use
export {
  addToFavorites,
  changeCity,
  fetchCommentsFailure,
  fetchCommentsStart,
  fetchCommentsSuccess,
  fetchFavoritesFailure,
  fetchFavoritesStart,
  fetchFavoritesSuccess,
  fetchOfferFailure,
  fetchOffersFailure,
  fetchOffersStart,
  fetchOffersSuccess,
  fetchOfferStart,
  fetchOfferSuccess,
  logoutAction,
  removeFromFavorites,
  requireAuthorization,
  setUser,
  sortOffers,
  updateOfferFavoriteStatus,
};
