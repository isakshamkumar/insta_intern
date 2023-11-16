import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const fetchUsers = createAsyncThunk('users/fetchUsers', async () => {
  try {
    const response = await fetch("http://localhost:3005")
    const data = await response.json();
    return data;
  }
  catch (error) {
    console.log(error)
  }
})

const usersSlice = createSlice({
  name: 'post',
  initialState: {
    users: [],
    status: undefined,
    error: null
  },
  reducers: {
    addPost: (state, action) => {
      const { id } = action.payload;
      const user = state.users.accounts.findIndex(user => user.id === id)
      console.log(user);
      if (user !== -1) {
        state.users.accounts[user].posts.unshift(action.payload)
      }
      // state.users.push(action)
      console.log(action.payload, 'payload')
      // state.posts.push(action.payload,'payload.post')
    },
    addComment: (state, action) => {
      const { postId, comment } = action.payload;
      
      const user = state.users.accounts.find((user) => user.posts.find(post=>post.number===postId));
      
      if (user) {
        const post=user.posts.find(post=>post.number===postId);
        if(post){
          post.comment.push(comment)
        }
      }
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUsers.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.status = 'succeeded';
        // console.log(action);
        state.users = action.payload;
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },

})
export const usersliceActions = usersSlice.actions;
export default usersSlice.reducer;