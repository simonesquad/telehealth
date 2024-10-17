import { createSlice } from '@reduxjs/toolkit';
// import { sendResetEmail } from '../actions/userActions';

export const initialState = {
  loading: false,
  error: null,
  userInfo: JSON.parse(localStorage.getItem('userInfo')) ?? null,
  updateSuccess: false,
  orders: [],
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setLoading: (state) => {
      state.loading = true;
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
    setError: (state, { payload }) => {
      state.error = payload;
      state.loading = false;
    },
    verificationEmail: (state) => {
      state.userInfo && (state.userInfo.active = true);
      state.loading = false;
      state.error = null;
    },
    setServerResponseMsg: (state, { payload }) => {
      state.serverMsg = payload;
      state.loading = false;
    },
    setServerResponseStatus: (state, { payload }) => {
      state.serverStatus = payload;
      state.loading = false;
    },
    stateReset: (state) => {
      state.loading = false;
      state.serverMsg = null;
      state.error = null;
    },
    updateUserProfile: (state, { payload }) => {
      state.userInfo = payload;
      state.updateSuccess = true;
      state.loading = false;
      state.error = null;
    },
    sendResetEmail: (state, { payload }) => {
      state.userInfo = payload;
      state.error = null;
      state.loading = false;
    },
    resetUpdate: (state) => {
      state.updateSuccess = false;
    },
    setUserOrders: (state, { payload }) => {
      state.error = null;
      state.orders = payload;
      state.loading = false;
    },
  },
});

export const { setLoading, setError, userLogin, userLogout, updateUserProfile, resetUpdate, setUserOrders, verificationEmail, setServerResponseMsg, setServerResponseStatus, stateReset, sendResetEmail } =
  userSlice.actions;
export default userSlice.reducer;

export const userSelector = (state) => state.user;