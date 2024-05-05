import { Reducer, createSlice } from '@reduxjs/toolkit';
import { adoptionApplicationFeeApi } from '../../services/adoptionApplicationFeeApi';

interface AdoptionApplicationFeeStatePayload {
  loading: boolean;
  success: boolean;
  error: string | false | null;
  message: string | null;
  adoptionApplicationFees: [] | any;
  isExpired: boolean;
  activeSession: {};
  token: string;
  exp: number;
  statusCode: number;
}

const initialAdoptionApplicationFeeState: AdoptionApplicationFeeStatePayload = {
  loading: false,
  success: false,
  error: null,
  message: '',
  adoptionApplicationFees: [],
  isExpired: true,
  activeSession: {},
  token: '',
  exp: 0,
  statusCode: 0,
};

export const adoptionApplicationFeeSlice = createSlice({
  name: 'adoptionApplicationFee',
  initialState: initialAdoptionApplicationFeeState,
  reducers: {
    resetAdoptionFee: (state) => {
      state.error = null;
      state.message = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addMatcher(
        adoptionApplicationFeeApi.endpoints.getAdoptionApplicationFees.matchFulfilled,
        (state, { payload }: any) => {
          state.adoptionApplicationFees = payload.adoptionApplicationFees;
        }
      )
      .addMatcher(
        adoptionApplicationFeeApi.endpoints.createAdoptionApplicationFee.matchFulfilled,
        (state, { payload }: any) => {
          state.message = payload.message;
          state.token = payload.token;
          state.success = payload.success;
        }
      )
      .addMatcher(
        adoptionApplicationFeeApi.endpoints.checkIfUserHasActiveAdoptionFeeSession
          .matchFulfilled,
        (state, { payload }: any) => {
          state.message = payload.message;
          state.isExpired = payload.isExpired;
          state.activeSession = payload.activeSession;
          state.token = payload.token;
          state.success = payload.success;
        }
      )
      .addMatcher(
        adoptionApplicationFeeApi.endpoints.jwtCheckValidityAdoptionFee.matchFulfilled,
        (state, { payload }: any) => {
          state.message = payload.message;
          state.isExpired = payload.isExpired;
          state.exp = payload.exp;
          state.statusCode = payload.statusCode;
        }
      )
      .addMatcher(
        (action) =>
          action.type.endsWith('/rejected') &&
          action?.payload?.data?.sliceName === 'adoptionApplicationFeeApi',
        (state, action: any) => {
          state.loading = false;
          state.error = action.payload.data;
        }
      );
  },
});

export const adoptionApplicationFeeReducuer =
  adoptionApplicationFeeSlice.reducer as Reducer<AdoptionApplicationFeeStatePayload>;

export const { resetAdoptionFee } = adoptionApplicationFeeSlice.actions;
