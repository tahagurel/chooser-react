import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import nProgress from 'nprogress';
import http from '../../services/api';

export const getComparisons = createAsyncThunk('comparison/getComparisons', async (type, { getState }) => {
  const state = getState();
  const { data } = await http.get('comparison', { params: { ...state.comparison.searchData } });
  return { data, type };
});

export const getComparison = createAsyncThunk('comparison/getComparison', async (slug) => {
  const { data } = await http.get(`comparison/${slug}`);
  return data;
});

export const createComparison = createAsyncThunk('comparison/createComparison', async (formData) => {
  const postHeader = {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  };
  const { data } = await http.post('comparison/create', formData, postHeader);
  return data;
});

export const useVote = createAsyncThunk('comparison/useVote', async (formData) => {
  const { data } = await http.post('comparison/vote', formData);
  return data;
});

export const loadMore = createAsyncThunk('comparison/loadMore', async (arg, { dispatch }) => {
  dispatch(getComparisons('page'));
});

export const changeOrder = createAsyncThunk('comparison/changeOrder', async (arg, { dispatch }) => {
  dispatch(getComparisons('order'));
});

export const newComment = createAsyncThunk('comparison/newComment', async (formData) => {
  const { data } = await http.post('comparison/comment', formData);
  return data;
});

export const deleteComment = createAsyncThunk('comparison/deleteComment', async (formData) => {
  const { data } = await http.post('comparison/delete_comment', formData);
  return data;
});

export const comparisonSlice = createSlice({
  name: 'comparison',
  initialState: {
    comparisons: [],
    comparison: {},
    loading: false,
    voteLoading: false,
    searchData: {
      page: 1,
      category: null,
      user: null,
      order: null,
      item: null,
    },
    searchLoading: false,
    commentLoading: false,
    totalData: 0,
    itemName: '',
  },
  reducers: {
    resetSearchData: (state, { payload }) => {
      state.comparisons = [];
      state.searchData.page = 1;
      if (payload) {
        state.searchData.order = null;
        state.searchData.user = null;
        state.searchData.category = null;
        state.searchData.item = null;
      }
    },
    setOrder: (state, { payload }) => {
      state.searchData.order = payload;
    },
    setSearchUser: (state, { payload }) => {
      state.searchData.user = payload;
    },
    setSearchCategory: (state, { payload }) => {
      state.searchData.category = payload;
    },
    setSearchItem: (state, { payload }) => {
      state.searchData.item = payload;
    },
  },
  extraReducers: {
    [getComparisons.pending]: (state) => {
      state.loading = true;
      nProgress.start();
    },
    [getComparisons.fulfilled]: (state, { payload }) => {
      state.comparisons = payload.type === 'page' ? state.comparisons.concat(payload.data.result.data) : payload.data.result.data;
      state.itemName = payload.data.item?.name;
      state.loading = false;
      state.searchLoading = false;
      state.totalData = payload.data.result.total;
      nProgress.done();
    },
    [getComparison.pending]: (state) => {
      state.loading = true;
      nProgress.start();
    },
    [getComparison.fulfilled]: (state, { payload }) => {
      state.comparison = payload;
      state.loading = false;
      nProgress.done();
    },
    [createComparison.pending]: (state) => {
      state.loading = true;
      nProgress.start();
    },
    [createComparison.fulfilled]: (state) => {
      state.loading = false;
      nProgress.done();
    },
    [createComparison.rejected]: (state) => {
      state.loading = false;
      nProgress.done();
    },
    [useVote.pending]: (state) => {
      state.voteLoading = true;
      nProgress.start();
    },
    [useVote.fulfilled]: (state, { payload }) => {
      state.voteLoading = false;
      const refreshComparisonIndex = state.comparisons.findIndex((item) => item.id === payload.id);
      state.comparisons[refreshComparisonIndex] = payload;
      state.comparison = payload;
      nProgress.done();
    },
    [useVote.rejected]: (state) => {
      state.voteLoading = false;
      nProgress.done();
    },
    [loadMore.pending]: (state) => {
      nProgress.start();
      state.searchData.page += 1;
      state.searchLoading = true;
    },
    [changeOrder.pending]: (state) => {
      nProgress.start();
      state.searchData.page = 1;
      state.searchLoading = true;
    },
    [newComment.pending]: (state) => {
      nProgress.start();
      state.commentLoading = true;
    },
    [newComment.fulfilled]: (state, { payload }) => {
      nProgress.done();
      state.comparison = payload.data;
      state.commentLoading = false;
    },
    [newComment.rejected]: (state) => {
      nProgress.done();
      state.commentLoading = false;
    },
    [deleteComment.pending]: (state) => {
      nProgress.start();
      state.commentLoading = true;
    },
    [deleteComment.fulfilled]: (state, { payload }) => {
      nProgress.done();
      state.comparison = payload.data;
      state.commentLoading = false;
    },
    [deleteComment.rejected]: (state) => {
      nProgress.done();
      state.commentLoading = false;
    },
  },
});

export const noMoreData = (state) => (!state.loading)
&& (state.comparison.totalData === state.comparison.comparisons.length);

export const {
  resetSearchData, setOrder, setSearchUser, setSearchCategory, setSearchItem,
} = comparisonSlice.actions;

export default comparisonSlice.reducer;
