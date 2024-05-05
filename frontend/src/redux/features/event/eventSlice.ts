import { Reducer, createSlice } from '@reduxjs/toolkit';
import { eventApi } from '../../services/eventApi';

interface EventStatePayload {
  loading: boolean;
  success: boolean;
  error: string | false | null;
  message: string | null;
  events: [] | any;
  event: {};
}

const initialEventState: EventStatePayload = {
  loading: false,
  success: false,
  error: null,
  message: '',
  events: [],
  event: {},
};

export const eventSlice = createSlice({
  name: 'event',
  initialState: initialEventState,
  reducers: {
    resetEventError: (state) => {
      state.error = null;
      state.message = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addMatcher(
        eventApi.endpoints.getEvents.matchFulfilled,
        (state, { payload }: any) => {
          state.events = payload.events;
        }
      )
      .addMatcher(
        eventApi.endpoints.getEvent.matchFulfilled,
        (state, { payload }: any) => {
          state.event = payload.event;
        }
      )
      .addMatcher(
        eventApi.endpoints.updateEvent.matchFulfilled,
        (state, { payload }: any) => {
          state.message = payload.message;
        }
      )
      .addMatcher(
        eventApi.endpoints.createEvent.matchFulfilled,
        (state, { payload }: any) => {
          state.message = payload.message;
        }
      )
      .addMatcher(
        eventApi.endpoints.deleteEvent.matchFulfilled,
        (state, { payload }: any) => {
          state.message = payload.message;
        }
      )
      .addMatcher(
        (action: any) =>
          action.type.endsWith('/rejected') &&
          action.payload?.data?.sliceName === 'eventApi',
        (state: any, action: any) => {
          state.loading = false;
          state.error = action.payload.data;
        }
      );
  },
});

export const eventReducer = eventSlice.reducer as Reducer<EventStatePayload>;
export const { resetEventError } = eventSlice.actions;
