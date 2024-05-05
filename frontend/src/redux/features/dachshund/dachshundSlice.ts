import { Reducer, createSlice } from '@reduxjs/toolkit';
import { rescueGroupsApi } from '../../services/rescueGroupsApi';

interface DachshundDetailsPayload {
  data: [
    {
      attributes: {
        photos: string[];
        name: string;
        ageGroup: number;
        sex: string;
        breedString: string;
        descriptionHtml: string;
        adoptionFeeString: string;
      };
      id: string;
      relationships: {
        statuses: {
          data: [
            {
              type: string;
              id: string;
            }
          ];
        };
      };
    }
  ];
  included: any[];
  meta: {
    count: number;
    countReturned: number;
    pageReturned: number;
    limit: number;
    pages: number;
  };
}

interface DachshundStatePayload {
  loading: boolean;
  success: boolean;
  error: string | false | null;
  message: string | null;
  dachshundCount: number;
  searchBarData: [] | null;
  available: [] | null;
  allDogs: any[] | null;
  dachshund: DachshundDetailsPayload | null;
  searchBar: {
    list: [];
  };
  initialData: {} | null | unknown;
  dachshunds: [];
  totalCount: number;
}

const initialDachshundDetailsPayload: DachshundDetailsPayload = {
  data: [
    {
      id: '',
      attributes: {
        photos: [],
        name: '',
        ageGroup: 0,
        sex: '',
        breedString: '',
        descriptionHtml: '',
        adoptionFeeString: '',
      },
      relationships: {
        statuses: {
          data: [{ type: '', id: '' }],
        },
      },
    },
  ],
  included: [],
  meta: { count: 0, countReturned: 0, pageReturned: 0, limit: 0, pages: 0 },
};

const initialDachshundState: DachshundStatePayload = {
  loading: false,
  success: false,
  error: null,
  message: '',
  dachshundCount: 0,
  searchBarData: [],
  available: [],
  allDogs: [] as any,
  dachshund: initialDachshundDetailsPayload,
  searchBar: {
    list: [],
  },
  initialData: null,
  dachshunds: [],
  totalCount: 0,
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
          state.available = action.payload.dachshunds;
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
