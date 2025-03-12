// src/routes/buyerRoutes.ts

import express from 'express';
import { getBuyers, createBuyer } from '../controllers/buyerController'; // 引入 controller

const router = express.Router();

// 获取买家列表
router.get('/buyers', getBuyers);

// 新建买家
router.post('/buyers', createBuyer);

export default router;
