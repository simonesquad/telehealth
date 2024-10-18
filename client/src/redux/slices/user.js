import { createSlice } from '@reduxjs/toolkit';

export const initialState = {
  loading: false,
  error: null,
  userInfo: JSON.parse(localStorage.getItem('userInfo')) ?? null,
  serverMsg: null,
  serverStatus: null,
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUserOrders: (state, { payload }) => {
      state.error = null;
      state.orders = payload;
      state.loading = false;
    },
    setError: (state, { payload }) => {
      state.error = payload;
      state.loading = false;
    },
    setLoading: (state) => {
      state.loading = true;
    },
    setServerResponseStatus: (state, { payload }) => {
      state.serverStatus = payload;
      state.loading = false;
    },
    setServerResponseMsg: (state, { payload }) => {
      state.serverMsg = payload;
      state.loading = false;
    },
    userLogin: (state, { payload }) => {
      state.userInfo = payload;
      state.error = null;
      state.loading = false;
    },
    userLogout: (state) => {
      state.loading = false;
      state.error = null;
      state.userInfo = null;
    },
    verificationEmail: (state) => {
      state.userInfo && (state.userInfo.active = true);
      state.loading = false;
      state.error = null;
    },
    stateReset: (state) => {
      state.loading = false;
      state.serverMsg = null;
      state.error = null;
    },   
  },
});

export const { 
  setUserOrders,
  setError, 
  setLoading, 
  setServerResponseStatus, 
  setServerResponseMsg,
  userLogin, 
  userLogout, 
  verificationEmail, 
  stateReset,
} = userSlice.actions;

export default userSlice.reducer;

export const userSelector = (state) => state.user;