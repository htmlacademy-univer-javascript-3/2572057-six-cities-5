import { createAction, createAsyncThunk } from '@reduxjs/toolkit';
import { AxiosInstance } from 'axios';
import { SortType } from '../components/SortingOptions';
import { dropToken, saveToken } from '../services/token';
import { City, Offer } from '../types';
import { AuthData, AuthorizationStatus, UserData } from '../types/auth';
import { AppDispatch, RootState } from './types';

const Actions = {
  fetchOffersStart: 'offers/fetchStart',
  fetchOffersSuccess: 'offers/fetchSuccess',
  fetchOffersFailure: 'offers/fetchFailure',
  fetchOfferStart: 'offer/fetchStart',
  fetchOfferSuccess: 'offer/fetchSuccess',
  fetchOfferFailure: 'offer/fetchFailure',
  changeCity: 'change-city',
  sortOffers: 'sort-offers',
  requireAuthorization: 'user/requireAuthorization',
  setUser: 'user/setUser',
  logout: 'user/logout',
} as const;

export const fetchOffersStart = createAction(Actions.fetchOffersStart);
export const fetchOffersSuccess = createAction<Offer[]>(
  Actions.fetchOffersSuccess
);
export const fetchOffersFailure = createAction<string>(
  Actions.fetchOffersFailure
);
export const fetchOfferStart = createAction(Actions.fetchOfferStart);
export const fetchOfferSuccess = createAction<Offer>(Actions.fetchOfferSuccess);
export const fetchOfferFailure = createAction<string>(
  Actions.fetchOfferFailure
);
export const changeCity = createAction<City>(Actions.changeCity);
export const sortOffers = createAction<SortType>(Actions.sortOffers);
export const requireAuthorization = createAction<AuthorizationStatus>(
  Actions.requireAuthorization
);
export const setUser = createAction<UserData>(Actions.setUser);
export const logout = createAction(Actions.logout);

export const fetchOffers = createAsyncThunk<
  void,
  undefined,
  {
    dispatch: AppDispatch;
    state: RootState;
    extra: AxiosInstance;
  }
>('offers/fetch', async (_arg, { dispatch, extra: api }) => {
  try {
    dispatch(fetchOffersStart());
    const { data } = await api.get<Offer[]>('/offers');
    dispatch(fetchOffersSuccess(data));
  } catch (error) {
    dispatch(
      fetchOffersFailure(
        error instanceof Error ? error.message : 'Failed to load offers'
      )
    );
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
    dispatch(
      fetchOfferFailure(
        error instanceof Error ? error.message : 'Failed to load offer'
      )
    );
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

export const logoutAction = createAsyncThunk<
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
    dispatch(logout());
  } catch (error) {
    dropToken();
    dispatch(requireAuthorization(AuthorizationStatus.NoAuth));
    dispatch(logout());
    throw error;
  }
});
