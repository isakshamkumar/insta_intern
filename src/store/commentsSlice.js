

import { createSlice } from '@reduxjs/toolkit';
import usersSlice from './usersSlice';

const initialState = {
  comments: [],
};

const commentSlice = createSlice({
  name: 'comment',
  initialState,
  reducers: {
    addComment: (state, action) => {
      const { postId, comment } = action.payload;
      dispatch(usersSlice.actions.addComment({ postId, comment }));
     
    },
  },
});

export const { addComment, deleteComment } = commentSlice.actions;

export default commentSlice.reducer;
