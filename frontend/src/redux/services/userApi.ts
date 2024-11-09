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
    getUserShippingAddress: build.query({
      query: () => `${BASE_URL}/shipping-address`,
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
    updateUserProfileDetails: build.mutation({
      query: (user: any) => ({
        url: `${BASE_URL}/profile/details`,
        method: 'PATCH',
        body: user,
      }),
      invalidatesTags: ['User'],
    }),
    fetchUserProfileDetails: build.query({
      query: (userId: string) => {
        return `${BASE_URL}/profile/details/${userId}`;
      },
      providesTags: (result: any, error: any, arg: string) => [{ type: 'User', id: arg }],
    }),
    fetchUserAnonStatusAndShippingAddressDetails: build.query({
      query: (userId: string) => {
        return `${BASE_URL}/anon-status-shipping-address/details/${userId}`;
      },
      providesTags: (result: any, error: any, arg: string) => [{ type: 'User', id: arg }],
    }),
  }),
});

export const {
  useGetUsersQuery,
  useGetUserQuery,
  useGetUserShippingAddressQuery,
  useUpdateUserMutation,
  useUpdateUserRoleMutation,
  useDeleteUserMutation,
  useFetchPersonalDataQuery,
  useUpdateUserProfileDetailsMutation,
  useFetchUserProfileDetailsQuery,
  useFetchUserAnonStatusAndShippingAddressDetailsQuery,
} = userApi;
