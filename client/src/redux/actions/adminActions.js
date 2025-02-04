import axios from 'axios';
import { 
    setProducts, 
    setProductUpdateFlag, 
    setReviewRemovalFlag } 
from '../slices/product';

import { 
    setDeliveredFlag,
    setError,
    setLoading,
    resetError,
    getOrders,
    getUsers,
    userDelete,
    orderDelete
} from '../slices/admin';

export const getAllUsers = () => async (dispatch, getState) => {
    setLoading();
    const {
        user: { userInfo },
    } = getState();

    const config = { headers: { Authorization: `Bearer ${userInfo.token}`, 'Content-Type': 'application/json' } }; 

    try {
        const { data } = await axios.get('sapi/users', config);
    } catch (error) {
        setError(
            error.response && error.responde.data.message
            ? error.response.data.message
            : error.message
            ? error.message
            : 'An expected error has occured. Please try again later.'
        );
    }
};

export const deleteUser = (id) => async (dispatch, getState) => {
    setLoading();
    const {
        user: { userInfo },
    } = getState();

    const config = { headers: { Authorization: `Bearer ${userInfo.token}`, 'Content-Type': 'application/json' } }; 

    try {
        const { data } = await axios.delete(`api/users/${id}`, config);
        dispatch(userDelete(data));
    } catch (error) {
        setError(
            error.response && error.responde.data.message
            ? error.response.data.message
            : error.message
            ? error.message
            : 'An expected error has occured. Please try again later.'
        );
    }
};

export const getAllOrders = () => async (dispatch, getState) => {
    setLoading();
    const {
        user: { userInfo },
    } = getState();

    const config = { headers: { Authorization: `Bearer ${userInfo.token}`, 'Content-Type': 'application/json' } }; 

    try {
        const { data } = await axios.get('api/orders', config);
        dispatch(getOrders(data));
    } catch (error) {
        setError(
            error.response && error.responde.data.message
            ? error.response.data.message
            : error.message
            ? error.message
            : 'An expected error has occured. Please try again later.'
        );
    }
};

export const deleteOrder = (id) => async (dispatch, getState) => {
    setLoading();
    const {
        user: { userInfo },
    } = getState();

    const config = { headers: { Authorization: `Bearer ${userInfo.token}`, 'Content-Type': 'application/json' } }; 

    try {
        const { data } = await axios.delete(`api/orders/${id}`, config);
        dispatch(userDelete(data));
    } catch (error) {
        setError(
            error.response && error.responde.data.message
            ? error.response.data.message
            : error.message
            ? error.message
            : 'An expected error has occured. Please try again later.'
        );
    }
};

export const setDelivered = (id) => async (dispatch, getState) => {
    setLoading();
    const {
        user: { userInfo },
    } = getState();

    const config = { headers: { Authorization: `Bearer ${userInfo.token}`, 'Content-Type': 'application/json' } }; 

    try {
        await axios.delete(`api/orders/${id}`, config);
        dispatch(setDeliveredFlag());
    } catch (error) {
        setError(
            error.response && error.responde.data.message
            ? error.response.data.message
            : error.message
            ? error.message
            : 'An expected error has occured. Please try again later.'
        );
    }
};

export const resetErrorAndRemoval = () => async(dispatch) => {
    dispatch(resetError());
};

export const updateProduct = (
    brand,
    name,
    category,
    stock,
    price,
    id,
    productIsNew,
    description
) => async (dispatch, getState) => {
    setLoading();
    const {
        user: { userInfo },
    } = getState();

    const config = { headers: { Authorization: `Bearer ${userInfo.token}`, 'Content-Type': 'application/json' } }; 

    try {
        const { data } = await axios.put(
            'api/products',
            { brand, name, category, stock, price, id, productIsNew, description }, 
            config
        );
        dispatch(setProducts(data));
        dispatch(setProductUpdateFlag());
    } catch (error) {
        setError(
            error.response && error.responde.data.message
            ? error.response.data.message
            : error.message
            ? error.message
            : 'An expected error has occured. Please try again later.'
        );
    }
};

export const uploadProduct = (newProduct) => async (dispatch, getState) => {
    setLoading();
    const {
        user: { userInfo },
    } = getState();

    const config = { headers: { Authorization: `Bearer ${userInfo.token}`, 'Content-Type': 'application/json' } }; 

    try {
        const { data } = await axios.post(`api/products`, newProduct, config);
        dispatch(setProducts(data));
        dispatch(setProductUpdateFlag());
    } catch (error) {
        setError(
            error.response && error.responde.data.message
            ? error.response.data.message
            : error.message
            ? error.message
            : 'An expected error has occured. Please try again later.'
        );
    }
};

export const removeReview = (productId, reviewId) => async (dispatch, getState) => {
    setLoading();
    const {
        user: { userInfo },
    } = getState();

    const config = { headers: { Authorization: `Bearer ${userInfo.token}`, 'Content-Type': 'application/json' } }; 

    try {
        const { data } = await axios.put(`api/products${productId}/${reviewId}`, config);
        dispatch(setProducts(data));
        dispatch(setProductUpdateFlag());
    } catch (error) {
        setError(
            error.response && error.responde.data.message
            ? error.response.data.message
            : error.message
            ? error.message
            : 'An expected error has occured. Please try again later.'
        );
    }
};











