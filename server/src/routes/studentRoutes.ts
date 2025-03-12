// src/routes/studentRoutes.ts

import express from "express";
import {
  getAllStudents,
  getStudentById,
  createStudent,
  updateStudent,
  deleteStudent,
} from "../controllers/studentController"; // 引入 studentController

import authMiddleware from "../middleware/authMiddleware"; // 引入认证中间件

const router = express.Router();

// 获取所有学生数据
router.get("/", authMiddleware, getAllStudents);

// 获取单个学生数据
router.get("/:id", authMiddleware, getStudentById);

// 创建学生
router.post("/", authMiddleware, createStudent);

// 更新学生信息
router.put("/:id", authMiddleware, updateStudent);

// 删除学生
router.delete("/:id", authMiddleware, deleteStudent);

export default router;
