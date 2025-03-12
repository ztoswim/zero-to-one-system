// src/routes/authRoutes.ts

import express from "express";
import {
  registerCustomer,
  registerEmployee,
  login,
  forgotPassword,
} from "../controllers/authController";

const router = express.Router();

// 顾客注册
router.post("/register/customer", registerCustomer);

// 员工注册
router.post("/register/employee", registerEmployee);

// 登录
router.post("/login", login);

// 忘记密码
router.post("/forgot-password", forgotPassword);

export default router;
