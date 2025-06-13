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
    fetchUserProfile: build.query({
      query: () => `${BASE_URL}/fetch-user-profile`,
      providesTags: ['User', 'Campaign', 'Adoption-Application-Fee'],
    }),
    updateUserProfile: build.mutation({
      query: (user: any) => ({
        url: `${BASE_URL}/update-user-profile`,
        method: 'PATCH',
        body: user,
      }),
      invalidatesTags: ['User'],
    }),
    removeUserAddress: build.mutation({
      query: ({ userId }: { userId: string }) => ({
        url: `${BASE_URL}/${userId}/address`,
        method: 'DELETE',
      }),
      invalidatesTags: ['User'],
    }),
  }),
});

export const {
  useGetUsersQuery,
  useGetUserQuery,
  useUpdateUserRoleMutation,
  useDeleteUserMutation,
  useFetchUserProfileQuery,
  useUpdateUserProfileMutation,
  useRemoveUserAddressMutation,
} = userApi;
