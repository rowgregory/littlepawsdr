import { Reducer, createSlice } from '@reduxjs/toolkit';
import { rescueGroupsApi } from '../../services/rescueGroupsApi';

interface DachshundStatePayload {
  loading: boolean;
  success: boolean;
  error: string | false | null;
  message: string | null;
  dachshundCount: number;
  searchBarData: [] | null;
  available: [] | null;
  allDogs: any[] | null;
  dachshund: {
    attributes: {
      photos: [];
      name: string;
      ageGroup: string;
      sex: string;
      breedString: string;
      descriptionHtml: string;
    };
  } | null;
  searchBar: {
    list: [];
  };
  initialData: {} | null | unknown;
  dachshunds: [];
  totalCount: number;
  dogStatusId: string;
}

const initialDachshundState: DachshundStatePayload = {
  loading: false,
  success: false,
  error: null,
  message: '',
  dachshundCount: 0,
  searchBarData: [],
  available: [],
  allDogs: [] as any,
  dachshund: {
    attributes: {
      photos: [],
      name: '',
      ageGroup: '',
      sex: '',
      breedString: '',
      descriptionHtml: '',
    },
  },
  searchBar: {
    list: [],
  },
  initialData: null,
  dachshunds: [],
  totalCount: 0,
  dogStatusId: '',
};

export const dachshundSlice = createSlice({
  name: 'dachshund',
  initialState: initialDachshundState,
  reducers: {
    resetDachshundError: (state) => {
      state.error = null;
      state.message = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addMatcher(
        rescueGroupsApi.endpoints.getDachshundById.matchFulfilled,
        (state, action: any) => {
          state.dachshund = action.payload.data[0];
          state.dogStatusId = action.payload.data[0].relationships?.statuses?.data[0]?.id;
        }
      )
      .addMatcher(
        rescueGroupsApi.endpoints.getTotalDachshundCount.matchFulfilled,
        (state, action: any) => {
          state.totalCount = action.payload.dachshundCount;
        }
      )
      .addMatcher(
        rescueGroupsApi.endpoints.getDachshundsByStatus.matchFulfilled,
        (state, action: any) => {
          state.dachshunds = action.payload.data;
        }
      )
      .addMatcher(
        (action: any) =>
          action.type.endsWith('/rejected') && action.payload.data.sliceName === 'dachshundApi',
        (state: any, action: any) => {
          state.loading = false;
          state.error = action.payload.data;
        }
      );
  },
});

export const dachshundReducer = dachshundSlice.reducer as Reducer<DachshundStatePayload>;

export const { resetDachshundError } = dachshundSlice.actions;
