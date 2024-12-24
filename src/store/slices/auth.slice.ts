import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AuthorizationStatus, UserData } from '../../types/auth';

type AuthState = {
  authorizationStatus: AuthorizationStatus;
  user: UserData | null;
};

const initialState: AuthState = {
  authorizationStatus: AuthorizationStatus.Unknown,
  user: null,
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    requireAuthorization: (
      state,
      action: PayloadAction<AuthorizationStatus>
    ) => {
      state.authorizationStatus = action.payload;
    },
    setUser: (state, action: PayloadAction<UserData>) => {
      state.user = action.payload;
    },
    logout: (state) => {
      state.user = null;
      state.authorizationStatus = AuthorizationStatus.NoAuth;
    },
  },
});

export const { requireAuthorization, setUser, logout } = authSlice.actions;

export default authSlice.reducer;
