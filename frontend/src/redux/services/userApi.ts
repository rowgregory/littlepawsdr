import { api } from './api';

const BASE_URL = '/users';

export const userApi = api.injectEndpoints({
  endpoints: (build: any) => ({
    getUsers: build.query({
      query: () => BASE_URL,
      providesTags: ['User'],
    }),
    getUserById: build.query({
      query: (userId: string) => `${BASE_URL}/${userId}`,
      providesTags: (result: any, error: any, arg: any) => [{ type: 'User', id: arg }],
    }),
    updateUserRole: build.mutation({
      query: (user: any) => ({
        url: `${BASE_URL}/role/${user.id}`,
        method: 'PATCH',
        body: user,
      }),
      invalidatesTags: ['User'],
    }),
    deleteUser: build.mutation({
      query: ({ id }: { id: string }) => ({
        url: `${BASE_URL}/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['User'],
    }),
    getUserProfile: build.query({
      query: () => `${BASE_URL}/get-user-profile`,
      providesTags: ['User', 'Auction', 'Adoption-Application-Fee'],
    }),
    updateUserProfile: build.mutation({
      query: (user: any) => ({
        url: `${BASE_URL}/update-user-profile`,
        method: 'PATCH',
        body: user,
      }),
      // invalidatesTags: ['User', 'Auction'],
    }),
    deleteUserAddress: build.mutation({
      query: ({ userId }: { userId: string }) => ({
        url: `${BASE_URL}/${userId}/address`,
        method: 'DELETE',
      }),
      invalidatesTags: ['User'],
    }),
    updateLastSeenChangelogVersion: build.mutation({
      query: (currentVersion: string) => ({
        url: `${BASE_URL}/update-last-seen-changelog-version`,
        method: 'PATCH',
        body: currentVersion,
      }),
      invalidatesTags: ['User'],
    }),
  }),
});

export const {
  useGetUsersQuery,
  useGetUserByIdQuery,
  useUpdateUserRoleMutation,
  useDeleteUserMutation,
  useGetUserProfileQuery,
  useUpdateUserProfileMutation,
  useDeleteUserAddressMutation,
  useUpdateLastSeenChangelogVersionMutation,
} = userApi;
