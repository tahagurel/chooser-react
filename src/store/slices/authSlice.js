import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { signInWithPopup, GoogleAuthProvider, TwitterAuthProvider } from 'firebase/auth';
import NProgress from 'nprogress';
import authentication from '../../services/auth/firebase-config';
import http from '../../services/api';

export const checkAuth = createAsyncThunk('auth/checkAuth', async () => {
  const { data } = await http.get('user');
  return data;
});
export const logout = createAsyncThunk('auth/logout', async () => {
  const { data } = await http.post('logout');
  return data;
});
export const loginOrRegister = createAsyncThunk('auth/loginOrRegister', async (type) => {
  if (type === 'google') {
    const provider = new GoogleAuthProvider();
    const socialData = await signInWithPopup(authentication, provider).then(
      (response) => ({
        name: response.user.displayName,
        email: response.user.email,
        image: response.user.photoURL,
        provider_name: response.providerId,
        provider_id: response.user.providerData[0].uid,
      }),
    ).catch((err) => err);
    const { data } = await http.post('login', socialData);
    return data;
  }
  const provider = new TwitterAuthProvider();
  const socialData = await signInWithPopup(authentication, provider).then(
    (response) => ({
      name: response.user.displayName,
      email: response.user.email,
      image: response.user.photoURL,
      provider_name: response.providerId,
      provider_id: response.user.providerData[0].uid,
    }),
  ).catch((err) => err);
  const { data } = await http.post('login', socialData);
  return data;
});

export const authSlice = createSlice({
  name: 'auth',
  initialState: {
    isLogin: false,
    user: {},
    loading: true,
  },
  reducers: {
    logout: (state) => {
      state.loading = true;
      authentication.signOut();
      state.user = {};
      state.isLogin = false;
      state.loading = false;
    },
  },
  extraReducers: {
    [logout.pending]: (state) => {
      NProgress.start();
      state.loading = true;
    },
    [logout.fulfilled]: (state) => {
      authentication.signOut();
      state.user = {};
      state.isLogin = false;
      state.loading = false;
      NProgress.done();
    },
    [loginOrRegister.pending]: (state) => {
      NProgress.start();
      state.loading = true;
    },
    [loginOrRegister.fulfilled]: (state, action) => {
      state.user = action.payload;
      state.isLogin = true;
      state.loading = false;
      NProgress.done();
    },
    [checkAuth.pending]: (state) => {
      NProgress.start();
      state.loading = true;
    },
    [checkAuth.fulfilled]: (state, action) => {
      state.user = action.payload;
      state.isLogin = !!action.payload;
      state.loading = false;
      NProgress.done();
    },
    [checkAuth.rejected]: (state) => {
      state.loading = false;
      NProgress.done();
    },
  },
});

// export const { logout } = authSlice.actions;
export default authSlice.reducer;
