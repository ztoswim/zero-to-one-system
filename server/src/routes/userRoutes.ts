import express from "express";
import User from "../models/User";
import authMiddleware from "../middleware/authMiddleware";
import { Request } from "express";

interface AuthenticatedRequest extends Request {
  userId?: string;
}

const router = express.Router();

router.get("/me", authMiddleware, async (req: AuthenticatedRequest, res) => {
  const user = await User.findById(req.userId);
  res.json(user);
});

// 获取用户信息
router.get("/me", authMiddleware, async (req: AuthenticatedRequest, res) => {
  const user = await User.findById(req.userId);
  res.json(user);
});

// 编辑用户
router.put("/:id", authMiddleware, async (req: AuthenticatedRequest, res) => {
  const { username } = req.body;
  await User.findByIdAndUpdate(req.params.id, { username });
  res.json({ message: "用户信息更新成功" });
});

// 删除用户
router.delete("/:id", authMiddleware, async (req: AuthenticatedRequest, res) => {
  await User.findByIdAndDelete(req.params.id);
  res.json({ message: "用户已删除" });
});

export default router;
