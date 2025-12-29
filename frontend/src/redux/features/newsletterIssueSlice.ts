import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface NewsletterIssue {
  _id: string;
  year: number;
  quarter: string;
  title: string;
  description: string;
  imageUrl: string;
  publishedAt: string;
  createdAt: string;
}

interface NewsletterIssueState {
  newsletterIssues: NewsletterIssue[];
  selectedNewsletter: NewsletterIssue | null;
  isLoading: boolean;
  error: string | null;
  expandedYears: number[];
}

const initialState: NewsletterIssueState = {
  newsletterIssues: [],
  selectedNewsletter: null,
  isLoading: false,
  error: null,
  expandedYears: [],
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

    resetNewsletterState: (state) => {
      return initialState;
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
  resetNewsletterState,
} = newsletterIssueSlice.actions;

export const newsletterIssueReducer = newsletterIssueSlice.reducer;
