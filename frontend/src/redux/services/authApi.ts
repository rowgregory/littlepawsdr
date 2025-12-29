import { api } from './api';

const BASE_URL = '/auth';

export const authApi = api.injectEndpoints({
  endpoints: (build: any) => ({
    register: build.mutation({
      query: (body: any) => ({
        url: `${BASE_URL}/register`,
        method: 'POST',
        body,
      }),
    }),
    login: build.mutation({
      query: (body: any) => ({
        url: `${BASE_URL}/login`,
        method: 'POST',
        body,
      }),
    }),
    forgotPasswordEmail: build.mutation({
      query: (body: any) => ({
        url: `${BASE_URL}/forgot-password`,
        method: 'POST',
        body,
      }),
    }),
    validateForgotPasswordToken: build.query({
      query: (body: any) => ({
        url: `${BASE_URL}/validate-forgot-password-token/${body.token}`,
        method: 'GET',
      }),
    }),
    resetPassword: build.mutation({
      query: (body: any) => ({
        url: `${BASE_URL}/reset-password`,
        method: 'POST',
        body,
      }),
    }),
    logout: build.mutation({
      query: (user: any) => ({
        url: `${BASE_URL}/logout`,
        method: 'PATCH',
        body: user,
      }),
    }),
    updatePassword: build.mutation({
      query: (user: any) => ({
        url: `${BASE_URL}/update-password/${user.id}`,
        method: 'PATCH',
        body: user,
      }),
    }),
  }),
});

export const {
  useLoginMutation,
  useRegisterMutation,
  useLogoutMutation,
  useForgotPasswordEmailMutation,
  useValidateForgotPasswordTokenQuery,
  useResetPasswordMutation,
  useUpdatePasswordMutation,
} = authApi;
