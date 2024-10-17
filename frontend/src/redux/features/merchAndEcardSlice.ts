import { Reducer, createSlice } from '@reduxjs/toolkit';
import { merchAndEcardsApi } from '../services/merchAndEcardsApi';

interface MerchAndEcardsStatePayload {
  loading: boolean;
  success: boolean;
  error: string | false | null;
  message: string | null;
  category: string;
  toggleFilterDrawer: boolean;
  merchAndEcards: {}[];
  filteredItems: {}[];
  noFilteredItems: boolean;
  noItemsAvailableMessage: string;
  noItems: boolean;
}

const initialMerchAndEcardsStatePayloadState: MerchAndEcardsStatePayload = {
  loading: false,
  success: false,
  error: null,
  message: '',
  category: '',
  toggleFilterDrawer: false,
  merchAndEcards: [],
  filteredItems: [],
  noFilteredItems: false,
  noItemsAvailableMessage: '',
  noItems: false
};

export const merchAndEcardsSlice = createSlice({
  name: 'merchAndEcards',
  initialState: initialMerchAndEcardsStatePayloadState,
  reducers: {
    setFilterCategory: (state, { payload }) => {
      state.category = payload;
      state.filteredItems =
        payload === ''
          ? [...state.merchAndEcards]
          : state.merchAndEcards?.filter((item: any) => item.category === payload);

      state.noFilteredItems =
        payload !== '' &&
        state.merchAndEcards?.filter((item: any) => item.category === payload).length === 0;
    state.noItemsAvailableMessage = `Sorry no ${payload} available.`
    },
    setOpenFilterDrawer: (state) => {
      state.toggleFilterDrawer = true;
    },
    setCloseFilterDrawer: (state) => {
      state.toggleFilterDrawer = false;
    },
    setMerchAndEcards: (state, { payload }) => {
      state.merchAndEcards = payload;
      state.filteredItems = payload;
      state.noItems = payload.length === 0
    },
  },
  extraReducers: (builder) => {
    builder
      .addMatcher(
        merchAndEcardsApi.endpoints.getMerchAndEcards.matchFulfilled,
        (state, { payload }: any) => {
          state.merchAndEcards = payload.merchAndEcards;
        }
      )
      .addMatcher(
        (action) =>
          action.type.endsWith('/rejected') &&
          action.payload?.data?.sliceName === 'merchAndEcardsApi',
        (state, action: any) => {
          state.loading = false;
          state.error = action.payload.data;
        }
      );
  },
});

export const merchAndEcardsReducuer =
  merchAndEcardsSlice.reducer as Reducer<MerchAndEcardsStatePayload>;

export const { setFilterCategory, setOpenFilterDrawer, setCloseFilterDrawer, setMerchAndEcards } =
  merchAndEcardsSlice.actions;
