import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  adminCreateNewsletterIssueModal: false,
};

export const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    setOpenCreateAdminNewsletterIssueModal: (state) => {
      state.adminCreateNewsletterIssueModal = true;
    },
    setCloseCreateAdminNewsletterIssueModal: (state) => {
      state.adminCreateNewsletterIssueModal = false;
    },
  },
});

export const { setCloseCreateAdminNewsletterIssueModal, setOpenCreateAdminNewsletterIssueModal } =
  uiSlice.actions;
export const uiReducer = uiSlice.reducer;
