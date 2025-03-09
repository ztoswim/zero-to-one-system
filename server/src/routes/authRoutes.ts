import express from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/User";
import Student from "../models/Student";
import authMiddleware from "../middleware/authMiddleware";

// Extend the Request interface to include the user property
declare module 'express-serve-static-core' {
  interface Request {
    user?: {
      role: string;
    };
  }
}

const router = express.Router();

// 顾客注册
router.post("/register/customer", async (req, res): Promise<void> => {
  const { email, username, password, confirmPassword } = req.body;

  if (password !== confirmPassword) {
    res.status(400).json({ success: false, message: "密码不匹配" });
    return;
  }

  const studentExists = await Student.findOne({ email });
  if (!studentExists) {
    res.status(400).json({ success: false, message: "该 Email 未在学生数据库中注册" });
    return;
  }

  const userExists = await User.findOne({ email });
  if (userExists) {
    res.status(400).json({ success: false, message: "该 Email 已被注册" });
    return;
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  const newUser = new User({ email, username, password: hashedPassword, role: "customer" });
  await newUser.save();

  res.json({ success: true, message: "注册成功" });
});

// 员工注册（需要登录并且拥有权限）
router.post("/register/employee", authMiddleware, async (req, res): Promise<void> => {
  const { email, username, password, role } = req.body;

  // 只允许 boss 角色注册员工
  if (req.user?.role !== "boss") {
    res.status(403).json({ success: false, message: "无权限注册员工" });
    return;
  }

  if (!["boss", "admin", "coach"].includes(role)) {
    res.status(400).json({ success: false, message: "无效角色" });
    return;
  }

  const userExists = await User.findOne({ email });
  if (userExists) {
    res.status(400).json({ success: false, message: "该 Email 已被注册" });
    return;
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  const newUser = new User({ email, username, password: hashedPassword, role });
  await newUser.save();

  res.json({ success: true, message: "注册成功" });
});

// 登录
router.post("/login", async (req, res): Promise<void> => {
  const { username, password } = req.body;

  const user = await User.findOne({ username });
  if (!user) {
    res.status(400).json({ success: false, message: "用户不存在" });
    return;
  }

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    res.status(400).json({ success: false, message: "密码错误" });
    return;
  }

  const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET!, { expiresIn: "1h" });
  res.json({ success: true, message: "登录成功", token, role: user.role });
});

// 忘记密码
router.post("/forgot-password", async (req, res): Promise<void> => {
  const { email, username, password, confirmPassword } = req.body;

  if (password !== confirmPassword) {
    res.status(400).json({ success: false, message: "密码不匹配" });
    return;
  }

  const user = await User.findOne({ email, username });
  if (!user) {
    res.status(400).json({ success: false, message: "用户不存在" });
    return;
  }

  user.password = await bcrypt.hash(password, 10);
  await user.save();

  res.json({ success: true, message: "密码已重置" });
});

export default router;
