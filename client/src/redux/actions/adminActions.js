import axios from 'axios';
import { 
    etProducts, 
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
    const {
        user: { userInfo },
    } = getState();

    const config = { headers: { Authorization: `Bearer ${userInfo.token}`, 'Content-Type': 'application/json' } }; 

    try {
        const { data } = await axios.get('api/users', config);
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


