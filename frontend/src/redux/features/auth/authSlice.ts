import { Reducer, createSlice } from '@reduxjs/toolkit';

interface AuthStatePayload {
  loading: boolean;
  success: boolean;
  error: string | false | null;
  isAuthenticated: boolean;
  message: string | null;
  tokenIsValid: boolean;
  updateSuccess: boolean;
}

export const initialAuthState: AuthStatePayload = {
  loading: false,
  success: false,
  error: null,
  isAuthenticated: false,
  message: '',
  tokenIsValid: false,
  updateSuccess: false,
};

export const authSlice = createSlice({
  name: 'auth',
  initialState: initialAuthState,
  reducers: {
    resetAuthError: (state) => {
      state.error = null;
      state.message = null;
    },
    hydrateAuthState: (state, { payload }) => {
      state.isAuthenticated = payload.isAuthenticated;
    },
    flushAuthState: (state) => {
      state.isAuthenticated = false;
    },
  },
});

export const authReducer = authSlice.reducer as Reducer<AuthStatePayload>;

export const { resetAuthError, hydrateAuthState, flushAuthState } = authSlice.actions;
