import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { NewsletterIssue } from '../../types/entities/newsletter-issue';

interface NewsletterIssueState {
  newsletterIssues: NewsletterIssue[];
  selectedNewsletter: NewsletterIssue | null;
  isLoading: boolean;
  error: string | null;
  expandedYears: number[];
  newsletterIssueDrawer: boolean;
}

const initialState: NewsletterIssueState = {
  newsletterIssues: [],
  selectedNewsletter: null,
  isLoading: false,
  error: null,
  expandedYears: [],
  newsletterIssueDrawer: false,
};

const newsletterIssueSlice = createSlice({
  name: 'newsletterIssue',
  initialState,
  reducers: {
    setNewsletterIssues: (state, action: PayloadAction<NewsletterIssue[]>) => {
      state.newsletterIssues = action.payload;
    },

    setSelectedNewsletter: (state, action: PayloadAction<NewsletterIssue | null>) => {
      state.selectedNewsletter = action.payload;
    },

    addNewsletter: (state, action: PayloadAction<NewsletterIssue>) => {
      state.newsletterIssues.push(action.payload);
    },

    updateNewsletter: (state, action: PayloadAction<NewsletterIssue>) => {
      const index = state.newsletterIssues.findIndex((n) => n._id === action.payload._id);
      if (index !== -1) {
        state.newsletterIssues[index] = action.payload;
      }
    },

    deleteNewsletter: (state, action: PayloadAction<string>) => {
      state.newsletterIssues = state.newsletterIssues.filter((n) => n._id !== action.payload);
    },

    setLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },

    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    },

    toggleExpandedYear: (state, action: PayloadAction<number>) => {
      const year = action.payload;
      if (state.expandedYears.includes(year)) {
        state.expandedYears = state.expandedYears.filter((y) => y !== year);
      } else {
        state.expandedYears.push(year);
      }
    },

    setExpandedYears: (state, action: PayloadAction<number[]>) => {
      state.expandedYears = action.payload;
    },

    clearError: (state) => {
      state.error = null;
    },
    setOpenNewsletterIssueDrawer: (state) => {
      state.newsletterIssueDrawer = true;
    },
    setCloseNewsletterIssueDrawer: (state) => {
      state.newsletterIssueDrawer = false;
    },
  },
});

export const {
  setNewsletterIssues,
  setSelectedNewsletter,
  addNewsletter,
  updateNewsletter,
  deleteNewsletter,
  setLoading,
  setError,
  toggleExpandedYear,
  setExpandedYears,
  clearError,
  setOpenNewsletterIssueDrawer,
  setCloseNewsletterIssueDrawer,
} = newsletterIssueSlice.actions;

export const newsletterIssueReducer = newsletterIssueSlice.reducer;
