import axios from 'axios';
import {
  setUserOrders,
  setError,
  setLoading,
  setServerResponseStatus,
  setServerResponseMsg,
  userLogin,
  userLogout,
  verificationEmail,
  stateReset,
} from '../slices/user';

import { clearCart } from '../slices/cart';

export const login = (email, password) => async (dispatch) => {
  dispatch(setLoading(true));
  try {
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };

    const { data } = await axios.post('/api/users/login', { email, password }, config);

    dispatch(userLogin(data));
    localStorage.setItem('userInfo', JSON.stringify(data));
  } catch (error) {
    dispatch(
      setError(
        error.response && error.response.data
          ? error.response.data
          : error.message
          ? error.message
          : 'An unexpected error has occured. Please try again later.'
      )
    );
  }
};

export const logout = () => (dispatch) => {
  localStorage.removeItem('userInfo');
  dispatch(userLogout());
};

export const register = (name, email, password) => async (dispatch) => {
  dispatch(setLoading(true));
  try {
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };

    const { data } = await axios.post('/api/users/register', { name, email, password }, config);
    dispatch(userLogin(data));
    localStorage.setItem('userInfo', JSON.stringify(data));
  } catch (error) {
    dispatch(
      setError(
        error.response && error.response.data
          ? error.response.data
          : error.message
          ? error.message
          : 'An unexpected error has occured. Please try again later.'
      )
    );
  }
};

export const updateProfile = (id, name, email, password) => async (dispatch, getState) => {
  const {
    user: { userInfo },
  } = getState();

  try {
    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
        'Content-Type': 'application/json',
      },
    };
    const { data } = await axios.put(`/api/users/profile/${id}`, { _id: id, name, email, password }, config);
    localStorage.setItem('userInfo', JSON.stringify(data));
    dispatch(updateUserProfile(data));
  } catch (error) {
    dispatch(
      setError(
        error.response && error.response.data
          ? error.response.data
          : error.message
          ? error.message
          : 'An unexpected error has occured. Please try again later.'
      )
    );
  }
};

export const sendResetEmailHere = (email) => async(dispatch) => {
  dispatch(setLoading(true));
try {
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };

  const { data } = await axios.post('/api/users/password-reset-request', { email }, config);
  dispatch(sendResetEmail(data));
  localStorage.setItem('userInfo', JSON.stringify(data));
} catch (error) {
  dispatch(
    setError(
      error.response && error.response.data
        ? error.response.data
        : error.message
        ? error.message
        : 'An unexpected error has occured. Please verify that the email you entered is associated with this account.'
    )
  );
}
};

export const resetUpdateSuccess = () => async (dispatch) => {
  dispatch(resetUpdate());
};

export const getUserOrders = () => async (dispatch, getState) => {
  dispatch(setLoading(true));
  const {
    user: { userInfo },
  } = getState();

  try {
    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
        'Content-Type': 'application/json',
      },
    };
    const { data } = await axios.get(`/api/users/${userInfo._id}`, config);
    dispatch(setUserOrders(data));
  } catch (error) {
    dispatch(
      setError(
        error.response && error.response.data
          ? error.response.data
          : error.message
          ? error.message
          : 'An unexpected error has occured. Please try again later.'
      )
    );
  }
};

export const resetPassword = (password, token) => async (dispatch) => {
  dispatch(setLoading(true));
  try {
    const config = { headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' } };

    const { data, status } = await axios.post(`/api/users/password-reset`, { password }, config);
    console.log(data, status);
    dispatch(setServerResponseMsg(data, status));
    dispatch(setServerResponseStatus(status));
  } catch (error) {
    dispatch(
      setError(
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message
          ? error.message
          : 'An expected error has occured. Please try again later.'
      )
    );
  }
};