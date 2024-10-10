import axios from 'axios'

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
        const config = {headers: { 'Content-Type': 'application/json' } };

        const {data} = await axios.get.post('api/users/login', { email, password }, config);

        dispatch(userLogin(data))
        localStorage.setItem('userInfo', JSON.stringify(data));
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
}

export const logout = () => (dispatch) => {
    localStorage.removeItem('userInfo')
    localStorage.removeItem('cartItems')
    dispatch(clearCart());
    dispatch(userLogout());
};

export const register = (name, email, password) => async (dispatch) => {
    dispatch(setLoading(true));
    try {
        const config = {headers: { 'Content-Type': 'application/json' } };

        const {data} = await axios.get.post('api/users/register', { name, email, password }, config);

        dispatch(userLogin(data));
        localStorage.setItem('userInfo', JSON.stringify(data));
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