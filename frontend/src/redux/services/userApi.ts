import { api } from './api';

const BASE_URL = '/users';

export const userApi = api.injectEndpoints({
  endpoints: (build: any) => ({
    getUsers: build.query({
      query: () => BASE_URL,
      providesTags: ['User'],
    }),
    getUser: build.query({
      query: (userId: string) => `${BASE_URL}/${userId}`,
      providesTags: (result: any, error: any, arg: any) => [{ type: 'User', id: arg }],
    }),
    updateUser: build.mutation({
      query: (user: any) => ({
        url: `${BASE_URL}/${user.id}`,
        method: 'PUT',
        body: user,
      }),
      invalidatesTags: ['User', 'Campaign'],
    }),
    updateUserRole: build.mutation({
      query: (user: any) => ({
        url: `${BASE_URL}/role/${user.id}`,
        method: 'PUT',
        body: user,
      }),
      invalidatesTags: ['User'],
    }),
    deleteUser: build.mutation({
      query: (userId: any) => ({
        url: `${BASE_URL}/${userId}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['User'],
    }),
    fetchPersonalData: build.query({
      query: () => `${BASE_URL}/personal-data`,
      providesTags: ['User', 'Campaign', 'Adoption-Application-Fee'],
    }),
  }),
});

export const {
  useGetUsersQuery,
  useGetUserQuery,
  useUpdateUserMutation,
  useUpdateUserRoleMutation,
  useDeleteUserMutation,
  useFetchPersonalDataQuery,
} = userApi;
