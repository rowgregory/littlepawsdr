import { api } from './api';

const BASE_URL = '/board-member';

export const boardMemberApi = api.injectEndpoints({
  endpoints: (build: any) => ({
    getBoardMembers: build.query({
      query: () => BASE_URL,
      providesTags: ['Board-Member'],
    }),
    getBoardMember: build.query({
      query: (boardMemberId: string) => `${BASE_URL}/${boardMemberId}`,
      providesTags: (result: any, error: any, arg: any) => [{ type: 'Board-Member', id: arg }],
    }),
    createBoardMember: build.mutation({
      query: (boardMember: any) => ({
        url: BASE_URL,
        method: 'POST',
        body: boardMember,
      }),
      invalidatesTags: ['Board-Member'],
    }),
    updateBoardMember: build.mutation({
      query: (boardMember: any) => ({
        url: BASE_URL,
        method: 'PUT',
        body: boardMember,
      }),
      invalidatesTags: ['Board-Member'],
    }),
    deleteBoardMember: build.mutation({
      query: (boardMember: any) => ({
        url: `${BASE_URL}/${boardMember.id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Board-Member'],
    }),
  }),
});

export const {
  useGetBoardMembersQuery,
  useGetBoardMemberQuery,
  useCreateBoardMemberMutation,
  useUpdateBoardMemberMutation,
  useDeleteBoardMemberMutation,
} = boardMemberApi;
