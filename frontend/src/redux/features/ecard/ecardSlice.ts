import { Reducer, createSlice } from '@reduxjs/toolkit';
import { ecardApi } from '../../services/ecardApi';
import { EcardProps, EcardStatePayload } from '../../../types/ecard-types';

const ecardState: EcardProps = {
  _id: '',
  category: '',
  price: 0,
  image: '',
  name: '',
  isEcard: true,
  thumb: '',
  sendNow: true,
};

const initialEcardState: EcardStatePayload = {
  loading: false,
  success: false,
  error: null,
  message: '',
  ecards: [],
  ecard: ecardState,
  categories: [],
};

export const ecardSlice = createSlice({
  name: 'ecard',
  initialState: initialEcardState,
  reducers: {
    resetEcardError: (state) => {
      state.error = null;
      state.message = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addMatcher(ecardApi.endpoints.getEcards.matchFulfilled, (state, { payload }: any) => {
        state.ecards = payload.ecards;
        state.categories = payload.categories;
      })
      .addMatcher(ecardApi.endpoints.getEcard.matchFulfilled, (state, { payload }: any) => {
        state.ecard = payload.ecard;
      })
      .addMatcher(ecardApi.endpoints.updateEcard.matchFulfilled, (state, { payload }: any) => {
        state.message = payload.message;
      })
      .addMatcher(ecardApi.endpoints.createEcard.matchFulfilled, (state, { payload }: any) => {
        state.message = payload.message;
      })
      .addMatcher(ecardApi.endpoints.deleteEcard.matchFulfilled, (state, { payload }: any) => {
        state.message = payload.message;
      })

      .addMatcher(
        (action) =>
          action.type.endsWith('/rejected') && action.payload?.data?.sliceName === 'ecardApi',
        (state, action: any) => {
          state.loading = false;
          state.error = action.payload.data;
        }
      );
  },
});

export const ecardReducer = ecardSlice.reducer as Reducer<EcardStatePayload>;

export const { resetEcardError } = ecardSlice.actions;
