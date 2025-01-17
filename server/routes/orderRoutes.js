import express from 'express';
import asyncHandler from 'express-async-handler';
import Order from '../models/Order.js';
import { admin, protectRoute } from '../middleware/authMiddleware';

const orderRoutes = express.Router();

const getOrders = async (req, res) => {
    const orders = await Order.find({});
    res.json(orders);
};

orderRoutes.route('/').get(protectRoute, admin, getOrders);

export default orderRoutes;