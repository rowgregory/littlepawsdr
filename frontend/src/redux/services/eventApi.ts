import { api } from './api';

const BASE_URL = '/events';

export const eventApi = api.injectEndpoints({
  endpoints: (build: any) => ({
    getEvents: build.query({
      query: () => BASE_URL,
      providesTags: ['Event'],
    }),
    getEvent: build.query({
      query: (eventId: string) => `${BASE_URL}/${eventId}`,
      providesTags: (result: any, error: any, arg: any) => [{ type: 'Event', id: arg }],
    }),
    createEvent: build.mutation({
      query: (event: any) => ({
        url: BASE_URL,
        method: 'POST',
        body: event,
      }),
      invalidatesTags: ['Event'],
    }),
    updateEvent: build.mutation({
      query: (event: any) => ({
        url: `${BASE_URL}/${event.id}`,
        method: 'PUT',
        body: event,
      }),
      invalidatesTags: ['Event'],
    }),
    deleteEvent: build.mutation({
      query: (event: any) => ({
        url: `${BASE_URL}/${event.id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Event'],
    }),
  }),
});

export const { useGetEventsQuery, useGetEventQuery, useCreateEventMutation, useUpdateEventMutation, useDeleteEventMutation } =
  eventApi;
