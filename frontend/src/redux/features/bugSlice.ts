import { createSlice } from '@reduxjs/toolkit';
import { IBug } from '../../types/entities/bug';

export interface BugState {
  bugs: IBug[];
  bug: IBug | null;
  bugDrawer: boolean;
}

const initialState: BugState = {
  bugs: [],
  bug: null,
  bugDrawer: false,
};

export const bugSlice = createSlice({
  name: 'bug',
  initialState,
  reducers: {
    setOpenBugDrawer: (state) => {
      state.bugDrawer = true;
    },
    setCloseBugDrawer: (state) => {
      state.bugDrawer = false;
    },
    setBugs: (state, { payload }) => {
      state.bugs = payload;
    },
    setBug: (state, { payload }) => {
      state.bug = payload;
    },
  },
});

export const { setCloseBugDrawer, setOpenBugDrawer, setBug, setBugs } = bugSlice.actions;
export const bugReducer = bugSlice.reducer;
