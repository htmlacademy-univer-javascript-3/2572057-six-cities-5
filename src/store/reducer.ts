import { combineReducers } from '@reduxjs/toolkit';
import authReducer from './slices/auth.slice';
import commentsReducer from './slices/comments.slice';
import favoritesReducer from './slices/favorites.slice';
import offersReducer from './slices/offers.slice';

const rootReducer = combineReducers({
  offers: offersReducer,
  auth: authReducer,
  comments: commentsReducer,
  favorites: favoritesReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
export default rootReducer;
