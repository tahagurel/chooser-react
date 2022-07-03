import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import nProgress from 'nprogress';
import http from '../../services/api';

export const getUser = createAsyncThunk('user/getUser', async (slug) => {
  const { data } = await http.get(`user/${slug}`);
  return data;
});

export const userSlice = createSlice({
  name: 'user',
  initialState: {
    user: {},
    loading: false,
  },
  extraReducers: {
    [getUser.pending]: (state) => {
      state.loading = true;
      nProgress.start();
    },
    [getUser.fulfilled]: (state, { payload }) => {
      state.user = payload;
      state.loading = false;
      nProgress.done();
    },
  },
});

export default userSlice.reducer;
