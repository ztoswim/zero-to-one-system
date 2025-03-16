import express from 'express';
import { getBankList, getWalletList, createWallet } from '../controllers/biztoryController';
import authMiddleware from '../middleware/authMiddleware';

const router = express.Router();

// 获取银行列表
router.get("/bank-list", authMiddleware, getBankList);

// 获取钱包列表
router.get("/wallet-list", authMiddleware, getWalletList);

// 新增钱包
router.post("/create-wallet", authMiddleware, createWallet);

export default router;
