import express from "express";
import User from "../models/User";
import authMiddleware from "../middleware/authMiddleware";
import { Request } from "express";

interface AuthenticatedRequest extends Request {
  userId?: string;
}

const router = express.Router();

// 获取当前用户信息
router.get("/me", authMiddleware, async (req: AuthenticatedRequest, res) => {
  const user = await User.findById(req.userId);
  if (!user) {
    res.status(404).json({ success: false, message: "用户未找到" });
    return;
  }
  res.json({ success: true, message: "用户信息获取成功", data: user });
});

// 编辑用户信息
router.put("/:id", authMiddleware, async (req: AuthenticatedRequest, res) => {
  const { username } = req.body;
  const updatedUser = await User.findByIdAndUpdate(req.params.id, { username }, { new: true });
  if (!updatedUser) {
    res.status(404).json({ success: false, message: "用户未找到" });
    return;
  }
  res.json({ success: true, message: "用户信息更新成功", data: updatedUser });
});

// 删除用户
router.delete("/:id", authMiddleware, async (req: AuthenticatedRequest, res) => {
  const user = await User.findByIdAndDelete(req.params.id);
  if (!user) {
    res.status(404).json({ success: false, message: "用户未找到" });
    return;
  }
  res.json({ success: true, message: "用户已删除", data: null });
});

export default router;
