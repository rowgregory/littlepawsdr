import { Reducer, createSlice } from '@reduxjs/toolkit';
import { actionHistoryApi } from '../../services/actionHistoryApi';

interface ActionHistoryStatePayload {
  loading: boolean;
  success: boolean;
  error: string | false | null;
  list: [] | null;
  message: string | null;
}

const initialActionHistoryState: ActionHistoryStatePayload = {
  loading: false,
  success: false,
  error: null,
  list: [],
  message: '',
};

export const actionHistorySlice = createSlice({
  name: 'actionHistory',
  initialState: initialActionHistoryState,
  reducers: {
    resetActionHistory: (state) => {
      state.error = null;
      state.message = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addMatcher(
        actionHistoryApi.endpoints.getActionHistories.matchFulfilled,
        (state, { payload }: any) => {
          state.list = payload.actionHistories;
        }
      )
      .addMatcher(
        (action: any) =>
          action.type.endsWith('/rejected') &&
          action?.payload?.data?.sliceName === 'actionHistoryApi',
        (state: any, action: any) => {
          state.loading = false;
          state.error = action.payload.data;
        }
      );
  },
});

export const actionHistoryReducer =
  actionHistorySlice.reducer as Reducer<ActionHistoryStatePayload>;

export const { resetActionHistory } = actionHistorySlice.actions;
