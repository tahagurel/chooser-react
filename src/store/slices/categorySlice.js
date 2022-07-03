import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import nProgress from 'nprogress';
import http from '../../services/api';

export const getCategories = createAsyncThunk('category/getCategories', async () => {
  const { data } = await http.get('category');
  return data;
});
export const getCategory = createAsyncThunk('category/getCategory', async (slug) => {
  const { data } = await http.get(`category/${slug}`);
  return data;
});

export const categorySlice = createSlice({
  name: 'category',
  initialState: {
    categories: [],
    category: {},
    loading: false,
  },
  extraReducers: {
    [getCategories.pending]: (state) => {
      state.loading = true;
      nProgress.start();
    },
    [getCategories.fulfilled]: (state, { payload }) => {
      state.categories = payload;
      state.loading = false;
      nProgress.done();
    },
    [getCategory.pending]: (state) => {
      state.loading = true;
      nProgress.start();
    },
    [getCategory.fulfilled]: (state, { payload }) => {
      state.category = payload;
      state.loading = false;
      nProgress.done();
    },
  },
});

export default categorySlice.reducer;
