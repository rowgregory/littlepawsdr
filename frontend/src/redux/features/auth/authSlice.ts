import { Reducer, createSlice } from '@reduxjs/toolkit';
import { authApi } from '../../services/authApi';

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
  },
  extraReducers: (builder) => {
    builder
      .addMatcher(authApi.endpoints.login.matchFulfilled, (state: any, { payload }: any) => {
        state.isAuthenticated = true;
      })
      .addMatcher(authApi.endpoints.register.matchFulfilled, (state: any, { payload }: any) => {
        state.isAuthenticated = payload.isAuthenticated;
      })
      .addMatcher(authApi.endpoints.forgotPasswordEmail.matchFulfilled, (state: any, { payload }: any) => {
        state.message = payload.message;
      })
      .addMatcher(authApi.endpoints.validateForgotPasswordToken.matchFulfilled, (state: any, { payload }: any) => {
        state.message = payload.message;
        state.tokenIsValid = payload.tokenIsValid;
      })
      .addMatcher(authApi.endpoints.resetPassword.matchFulfilled, (state: any, { payload }: any) => {
        state.message = payload.message;
        state.success = payload.success;
        state.tokenIsValid = payload.tokenIsValid;
      })
      .addMatcher(authApi.endpoints.logout.matchFulfilled, (state: any, { payload }: any) => {
        state.message = payload.message;
      })
      .addMatcher(authApi.endpoints.updatePassword.matchFulfilled, (state, { payload }: any) => {
        state.message = payload.message;
        state.updateSuccess = payload.updateSuccess;
      })
      .addMatcher(
        (action: any) => action.type.endsWith('/rejected') && action.payload?.data?.sliceName === 'authApi',
        (state: any, action: any) => {
          state.loading = false;
          state.error = action.payload.data.message;
        }
      );
  },
});

export const authReducer = authSlice.reducer as Reducer<AuthStatePayload>;

export const { resetAuthError, hydrateAuthState } = authSlice.actions;
