import { Reducer, createSlice } from '@reduxjs/toolkit';

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
  ecardDrawer: boolean;
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
  ecardDrawer: false,
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
    setEcards: (state, { payload }) => {
      state.ecards = payload;
    },
    setOpenEcardDrawer: (state) => {
      state.ecardDrawer = true;
    },
    setCloseEcardDrawer: (state) => {
      state.ecardDrawer = false;
    },
  },
});

export const ecardReducer = ecardSlice.reducer as Reducer<EcardStatePayload>;

export const {
  resetEcardError,
  setOpenEcardUpdateDrawer,
  setCloseEcardUpdateDrawer,
  setOpenEcardCreateDrawer,
  setCloseEcardCreateDrawer,
  setEcards,
  setCloseEcardDrawer,
  setOpenEcardDrawer,
} = ecardSlice.actions;
