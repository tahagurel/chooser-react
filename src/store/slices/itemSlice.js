import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import nProgress from 'nprogress';
import http from '../../services/api';

export const getItems = createAsyncThunk('item/getItems', async () => {
  const { data } = await http.get('item');
  return data;
});
export const getitem = createAsyncThunk('item/getitem', async (slug) => {
  const { data } = await http.get(`item/${slug}`);
  return data;
});

export const itemSlice = createSlice({
  name: 'item',
  initialState: {
    items: [],
    item: {},
    loading: false,
  },
  extraReducers: {
    [getItems.pending]: (state) => {
      state.loading = true;
      nProgress.start();
    },
    [getItems.fulfilled]: (state, { payload }) => {
      state.items = payload;
      state.loading = false;
      nProgress.done();
    },
    [getitem.pending]: (state) => {
      state.loading = true;
      nProgress.start();
    },
    [getitem.fulfilled]: (state, { payload }) => {
      state.item = payload;
      state.loading = false;
      nProgress.done();
    },
  },
});

export default itemSlice.reducer;
