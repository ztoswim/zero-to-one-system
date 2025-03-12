import express from 'express';
import authMiddleware from '../middleware/authMiddleware';
import { getUserInfo, updateUserInfo, deleteUser } from '../controllers/userController';

const router = express.Router();

// 获取当前用户信息
router.get('/me', authMiddleware, getUserInfo);

// 编辑用户信息
router.put('/:id', authMiddleware, updateUserInfo);

// 删除用户
router.delete('/:id', authMiddleware, deleteUser);

export default router;
