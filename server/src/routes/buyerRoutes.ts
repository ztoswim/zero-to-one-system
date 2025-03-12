import express from 'express';
import { getBuyers, createBuyer, updateBuyer, deleteBuyer } from '../controllers/buyerController';

const router = express.Router();

// 获取买家列表
router.get('/', getBuyers);

// 创建新买家
router.post('/', createBuyer);

// 编辑买家
router.put('/:buyerId', updateBuyer);

// 删除买家
router.delete('/:buyerId', deleteBuyer);

export default router;
