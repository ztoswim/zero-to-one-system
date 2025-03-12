// src/routes/invoiceRoutes.ts

import express from "express";
import { submitInvoiceHandler } from "../controllers/invoiceController"; // 引入处理函数

const router = express.Router();

// 提交发票的路由
router.post("/submit-invoice", submitInvoiceHandler); // 直接调用 controller 中的 submitInvoiceHandler

export default router;
