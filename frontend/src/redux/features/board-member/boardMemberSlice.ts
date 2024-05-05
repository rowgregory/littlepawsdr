import { Reducer, createSlice } from '@reduxjs/toolkit';
import { boardMemberApi } from '../../services/boardMemberApi';

interface BoardMemberStatePayload {
  loading: boolean;
  success: boolean;
  error: string | false | null;
  message: string | null;
  boardMembers: [] | any;
  boardMember: {};
}

const initialBoardMemberState: BoardMemberStatePayload = {
  loading: false,
  success: false,
  error: null,
  message: '',
  boardMembers: [],
  boardMember: {},
};

export const boardMemberSlice = createSlice({
  name: 'boardMember',
  initialState: initialBoardMemberState,
  reducers: {
    resetBoardMemberError: (state) => {
      state.error = null;
      state.message = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addMatcher(
        boardMemberApi.endpoints.getBoardMembers.matchFulfilled,
        (state, { payload }: any) => {
          state.boardMembers = payload.boardMembers;
        }
      )
      .addMatcher(
        boardMemberApi.endpoints.getBoardMember.matchFulfilled,
        (state, { payload }: any) => {
          state.boardMember = payload.boardMember;
        }
      )
      .addMatcher(
        boardMemberApi.endpoints.createBoardMember.matchFulfilled,
        (state, { payload }: any) => {
          state.message = payload.message;
        }
      )
      .addMatcher(
        boardMemberApi.endpoints.updateBoardMember.matchFulfilled,
        (state, { payload }: any) => {
          state.message = payload.message;
        }
      )
      .addMatcher(
        boardMemberApi.endpoints.deleteBoardMember.matchFulfilled,
        (state, { payload }: any) => {
          state.message = payload.message;
        }
      )
      .addMatcher(
        (action: any) =>
          action.type.endsWith('/rejected') && action.payload.data.sliceName === 'boardMemberApi',
        (state: any, action: any) => {
          state.loading = false;
          state.error = action.payload.data;
        }
      );
  },
});

export const boardMemberReducuer = boardMemberSlice.reducer as Reducer<BoardMemberStatePayload>;

export const { resetBoardMemberError } = boardMemberSlice.actions;
