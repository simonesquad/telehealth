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

    const config = { headers: { Authorization: `Bearer ${userInfo.token}`, } }; 

    
};


