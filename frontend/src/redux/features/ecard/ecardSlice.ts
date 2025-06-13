import { Reducer, createSlice } from '@reduxjs/toolkit';
import { ecardApi } from '../../services/ecardApi';

interface EcardProps {
  _id: string;
  category?: string; // Category of the eCard (optional)
  price?: number; // Price of the eCard (optional)
  image?: string; // URL of the eCard image (optional)
  name?: string; // Name of the eCard (optional)
  isEcard?: boolean; // Indicates if it's an eCard, defaults to true (optional)
  thumb?: string; // URL of the thumbnail image (optional)
  sendNow?: boolean; // Indicates if the eCard can be sent immediately, defaults to true (optional)
  createdAt?: Date; // Timestamp for when the eCard was created (optional)
  updatedAt?: Date; // Timestamp for when the eCard was last updated (optional)
}

interface EcardStatePayload {
  loading: boolean;
  success: boolean;
  error: string | false | null;
  message: string | null;
  ecards: [EcardProps] | any;
  ecard: EcardProps;
  categories: [];
  toggleEcardUpdateDrawer: boolean;
  toggleEcardCreateDrawer: boolean;
}

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
  toggleEcardUpdateDrawer: false,
  toggleEcardCreateDrawer: false,
};

export const ecardSlice = createSlice({
  name: 'ecard',
  initialState: initialEcardState,
  reducers: {
    resetEcardError: (state) => {
      state.error = null;
      state.message = null;
    },
    setOpenEcardUpdateDrawer: (state, { payload }) => {
      state.toggleEcardUpdateDrawer = true;
      state.ecard = payload?.ecard;
    },
    setCloseEcardUpdateDrawer: (state) => {
      state.toggleEcardUpdateDrawer = false;
    },
    setOpenEcardCreateDrawer: (state) => {
      state.toggleEcardCreateDrawer = true;
    },
    setCloseEcardCreateDrawer: (state) => {
      state.toggleEcardCreateDrawer = false;
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
        (action) => action.type.endsWith('/rejected') && action.payload?.data?.sliceName === 'ecardApi',
        (state, action: any) => {
          state.loading = false;
          state.error = action.payload.data;
        }
      );
  },
});

export const ecardReducer = ecardSlice.reducer as Reducer<EcardStatePayload>;

export const { resetEcardError, setOpenEcardUpdateDrawer, setCloseEcardUpdateDrawer, setOpenEcardCreateDrawer, setCloseEcardCreateDrawer } =
  ecardSlice.actions;
