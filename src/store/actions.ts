import { createAction, createAsyncThunk } from '@reduxjs/toolkit';
import { AxiosInstance } from 'axios';
import { SortType } from '../components/SortingOptions';
import { City, Offer } from '../types';
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
