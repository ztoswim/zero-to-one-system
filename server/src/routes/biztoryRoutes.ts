import { Router } from 'express';
import { getBankList } from '../controllers/biztoryController';
import authenticateUser from '../middleware/authMiddleware';

const router = Router();

// 使用中间件进行用户认证，获取银行列表
router.get('/bank-list', authenticateUser, getBankList);

export default router;
