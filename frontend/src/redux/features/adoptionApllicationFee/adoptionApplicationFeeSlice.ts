import { Reducer, createSlice } from '@reduxjs/toolkit';

interface AdoptionApplicationFeeStatePayload {
  loading: boolean;
  success: boolean;
  error: string | false | null;
  message: string | null;
  adoptionApplicationFees: [] | any;
}

const initialAdoptionApplicationFeeState: AdoptionApplicationFeeStatePayload = {
  loading: false,
  success: false,
  error: null,
  message: '',
  adoptionApplicationFees: [],
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
});

export const adoptionApplicationFeeReducuer =
  adoptionApplicationFeeSlice.reducer as Reducer<AdoptionApplicationFeeStatePayload>;

export const { resetAdoptionFee } = adoptionApplicationFeeSlice.actions;
