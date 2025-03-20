import express from "express";
import { getAllUsers, getUserInfo, updateUserInfo, deleteUser } from "../controllers/userController";
import authMiddleware from "../middleware/authMiddleware";

const router = express.Router();

router.get("/list", authMiddleware, getAllUsers); // 获取所有用户
router.get("/me", authMiddleware, getUserInfo); // 获取当前用户
router.put("/:id", authMiddleware, updateUserInfo); // 更新用户
router.delete("/:id", authMiddleware, deleteUser); // 删除用户

export default router;
