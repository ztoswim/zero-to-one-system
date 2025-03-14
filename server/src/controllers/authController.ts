// src/controllers/authController.ts
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/User";
import Student from "../models/Student";
import { loginToBiztory } from "../utils/biztoryUtils"; // 引入 Biztory 登录的工具函数

// 顾客注册
export const registerCustomer = async (req: any, res: any): Promise<void> => {
  const { email, username, password, confirmPassword } = req.body;

  if (password !== confirmPassword) {
    res.status(400).json({ error: "密码不匹配" });
    return;
  }

  const studentExists = await Student.findOne({ email });
  if (!studentExists) {
    res.status(400).json({ error: "该 Email 未在学生数据库中注册" });
    return;
  }

  const userExists = await User.findOne({ email });
  if (userExists) {
    res.status(400).json({ error: "该 Email 已被注册" });
    return;
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  const newUser = new User({ email, username, password: hashedPassword, role: "customer" });
  await newUser.save();

  res.json({ message: "注册成功" });
};

// 员工注册
export const registerEmployee = async (req: any, res: any): Promise<void> => {
  const { email, username, password, role } = req.body;

  if (!["boss", "admin", "coach"].includes(role)) {
    res.status(400).json({ error: "无效角色" });
    return;
  }

  const userExists = await User.findOne({ email });
  if (userExists) {
    res.status(400).json({ error: "该 Email 已被注册" });
    return;
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  const newUser = new User({ email, username, password: hashedPassword, role });
  await newUser.save();

  res.json({ message: "注册成功" });
};

// 登录
export const login = async (req: any, res: any): Promise<void> => {
  const { username, password } = req.body;

  const user = await User.findOne({ username });
  if (!user) {
    res.status(400).json({ error: "用户不存在" });
    return;
  }

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    res.status(400).json({ error: "密码错误" });
    return;
  }

  // 登录成功后，生成 JWT token
  const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET!, { expiresIn: "1h" });

  // 如果是 admin 或 boss，自动登录 Biztory
  if (["admin", "boss"].includes(user.role)) {
    try {
      if (user.role === "admin" || user.role === "boss") {
        const biztoryResponse = await loginToBiztory(user.role); // 根据用户角色自动登录 Biztory
        res.json({ token, role: user.role, biztoryMessage: biztoryResponse.message }); // 返回 Biztory 登录的成功信息
      } else {
        res.json({ token, role: user.role }); // 非 admin 或 boss 用户仅返回 JWT token
      }
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : "未知错误";
      res.status(500).json({ error: `Biztory 登录失败: ${errorMessage}` });
    }
  } else {
    res.json({ token, role: user.role }); // 非 admin 或 boss 用户仅返回 JWT token
  }
};

// 忘记密码
export const forgotPassword = async (req: any, res: any): Promise<void> => {
  const { email, username, password, confirmPassword } = req.body;

  if (password !== confirmPassword) {
    res.status(400).json({ error: "密码不匹配" });
    return;
  }

  const user = await User.findOne({ email, username });
  if (!user) {
    res.status(400).json({ error: "用户不存在" });
    return;
  }

  user.password = await bcrypt.hash(password, 10);
  await user.save();

  res.json({ message: "密码已重置" });
};
