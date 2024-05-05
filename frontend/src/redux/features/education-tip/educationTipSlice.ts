import { Reducer, createSlice } from '@reduxjs/toolkit';
import { educationTipApi } from '../../services/educationTipApi';

interface EducationTipStatePayload {
  loading: boolean;
  success: boolean;
  error: string | false | null;
  message: string | null;
  educationTips: [] | any;
  educationTip: {};
}

const initialEducationTipState: EducationTipStatePayload = {
  loading: false,
  success: false,
  error: null,
  message: '',
  educationTips: [],
  educationTip: {},
};

export const educationTipSlice = createSlice({
  name: 'educationTip',
  initialState: initialEducationTipState,
  reducers: {
    resetEducationTipError: (state) => {
      state.error = null;
      state.message = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addMatcher(
        educationTipApi.endpoints.getEducationTips.matchFulfilled,
        (state, { payload }: any) => {
          state.educationTips = payload.educationTips;
        }
      )
      .addMatcher(
        educationTipApi.endpoints.getEducationTip.matchFulfilled,
        (state, { payload }: any) => {
          state.educationTip = payload.educationTip;
        }
      )
      .addMatcher(
        educationTipApi.endpoints.updateEducationTip.matchFulfilled,
        (state, { payload }: any) => {
          state.message = payload.message;
        }
      )
      .addMatcher(
        educationTipApi.endpoints.createEducationTip.matchFulfilled,
        (state, { payload }: any) => {
          state.message = payload.message;
        }
      )
      .addMatcher(
        educationTipApi.endpoints.deleteEducationTip.matchFulfilled,
        (state, { payload }: any) => {
          state.message = payload.message;
        }
      )
      .addMatcher(
        (action: any) =>
          action.type.endsWith('/rejected') &&
          action.payload?.data?.sliceName === 'educationTipApi',
        (state: any, action: any) => {
          state.loading = false;
          state.error = action.payload.data;
        }
      );
  },
});

export const educationTipReducer =
  educationTipSlice.reducer as Reducer<EducationTipStatePayload>;

export const { resetEducationTipError } = educationTipSlice.actions;
