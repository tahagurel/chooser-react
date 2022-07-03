import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import nProgress from 'nprogress';
import http from '../../services/api';

export const getSearch = createAsyncThunk('search/getSearch', async (formData) => {
  const { data } = await http.post('comparison/search', formData);
  return data;
});

export const searchSlice = createSlice({
  name: 'search',
  initialState: {
    results: [],
    loading: false,
    noResult: false,

  },
  extraReducers: {
    [getSearch.pending]: (state) => {
      state.loading = true;
      state.results = [];
      state.noResult = false;
      nProgress.start();
    },
    [getSearch.fulfilled]: (state, { payload }) => {
      state.results = payload || [];
      state.noResult = !payload;
      state.loading = false;
      nProgress.done();
    },
  },
});

export default searchSlice.reducer;
