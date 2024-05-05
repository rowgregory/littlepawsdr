import { Reducer, createSlice } from '@reduxjs/toolkit';
import { authApi } from '../../services/authApi';
import { User } from '../user/userSlice';

export interface AuthStatePayload {
  loading: boolean;
  success: boolean;
  error: string | false | null;
  user: User | null;
  message: string | null;
  validations: any[];
  strength: number;
  isExpired: boolean | null;
  statusCode?: number | null;
  refreshToken: string | null;
  tokenIsValid: boolean;
  passwordsMatch: boolean;
}

export const initialAuthState: AuthStatePayload = {
  loading: false,
  success: false,
  error: null,
  user: null,
  message: '',
  validations: [],
  strength: 0,
  isExpired: false,
  statusCode: null,
  refreshToken: null,
  tokenIsValid: false,
  passwordsMatch: false,
};

export const authSlice = createSlice({
  name: 'auth',
  initialState: initialAuthState,
  reducers: {
    resetPasswordStrength: (state) => {
      state.validations = [];
      state.strength = 0;
    },
    resetAuthSuccess: (state) => {
      state.success = false;
      state.passwordsMatch = false;
    },
    resetAuthError: (state) => {
      state.error = null;
      state.message = null;
    },
    setPasswordStrength: (state, action) => {
      const password = action.payload;

      const newValidations = [
        password?.length >= 9 ? 1 : 0,
        password?.search(/[A-Z]/) > -1 ? 1 : 0,
        password?.search(/[0-9]/) > -1 ? 1 : 0,
        password?.search(/[~`!@#$%^&*()_+={}|:;"',.?-]/) > -1 ? 1 : 0,
      ];

      state.validations = newValidations;
      state.strength = newValidations.reduce((acc, cur) => acc + cur, 0);
    },
  },
  extraReducers: (builder) => {
    builder
      .addMatcher(authApi.endpoints.login.matchFulfilled, (state: any, { payload }: any) => {
        state.user = payload;
      })
      .addMatcher(authApi.endpoints.register.matchFulfilled, (state: any, { payload }: any) => {
        state.message = payload.message;
      })
      .addMatcher(
        authApi.endpoints.updateAccountToConfirmed.matchFulfilled,
        (state: any, { payload }: any) => {
          state.isExpired = payload.isExpired;
          state.user = payload.user;
          state.message = payload.message;
          state.statusCode = payload.statusCode;
        }
      )
      .addMatcher(authApi.endpoints.refreshToken.matchFulfilled, (state: any, { payload }: any) => {
        state.refreshToken = payload.refreshToken;
      })
      .addMatcher(
        authApi.endpoints.forgotPasswordEmail.matchFulfilled,
        (state: any, { payload }: any) => {
          state.message = payload.message;
        }
      )
      .addMatcher(
        authApi.endpoints.validateForgotPasswordToken.matchFulfilled,
        (state: any, { payload }: any) => {
          state.message = payload.message;
          state.tokenIsValid = payload.tokenIsValid;
        }
      )
      .addMatcher(
        authApi.endpoints.resetPassword.matchFulfilled,
        (state: any, { payload }: any) => {
          state.message = payload.message;
          state.success = payload.success;
          state.tokenIsValid = payload.tokenIsValid;
        }
      )
      .addMatcher(authApi.endpoints.logout.matchFulfilled, (state: any, { payload }: any) => {
        state.message = payload.message;
      })
      .addMatcher(
        authApi.endpoints.validateCurrentPassword.matchFulfilled,
        (state, { payload }: any) => {
          state.message = payload.message;
          state.passwordsMatch = payload.passwordsMatch;
        }
      )
      .addMatcher(
        (action: any) =>
          action.type.endsWith('/rejected') && action.payload?.data?.sliceName === 'authApi',
        (state: any, action: any) => {
          state.loading = false;
          state.error = action.payload.data;
        }
      );
  },
});

export const authReducer = authSlice.reducer as Reducer<AuthStatePayload>;

export const { setPasswordStrength, resetPasswordStrength, resetAuthSuccess, resetAuthError } =
  authSlice.actions;
