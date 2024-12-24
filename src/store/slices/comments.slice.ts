import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { Comment } from '../../types/comment';

type CommentsState = {
  comments: Comment[];
  isCommentsLoading: boolean;
  commentsError: string | null;
};

const initialState: CommentsState = {
  comments: [],
  isCommentsLoading: false,
  commentsError: null,
};

export const commentsSlice = createSlice({
  name: 'comments',
  initialState,
  reducers: {
    fetchCommentsStart: (state) => {
      state.isCommentsLoading = true;
      state.commentsError = null;
    },
    fetchCommentsSuccess: (state, action: PayloadAction<Comment[]>) => {
      state.comments = action.payload.sort(
        (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
      );
      state.isCommentsLoading = false;
    },
    fetchCommentsFailure: (state, action: PayloadAction<string>) => {
      state.isCommentsLoading = false;
      state.commentsError = action.payload;
    },
  },
});

export const {
  fetchCommentsStart,
  fetchCommentsSuccess,
  fetchCommentsFailure,
} = commentsSlice.actions;

export default commentsSlice.reducer;
