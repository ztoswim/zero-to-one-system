import express from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/User";
import Student from "../models/Student";
import { JWT_SECRET } from "../config";

const router = express.Router();

// 顾客注册
router.post("/register", async (req, res) => {
  const { email, username, password, confirmPassword } = req.body;

  if (password !== confirmPassword) return res.status(400).json({ message: "Passwords do not match" });

  const studentExists = await Student.findOne({ email });
  if (!studentExists) return res.status(400).json({ message: "Student email not found" });

  const userExists = await User.findOne({ email });
  if (userExists) return res.status(400).json({ message: "User already exists" });

  const hashedPassword = await bcrypt.hash(password, 10);
  const user = new User({ email, username, password: hashedPassword, role: "customer" });
  await user.save();

  res.status(201).json({ message: "User registered successfully" });
});

// 登录
router.post("/login", async (req, res) => {
  const { username, password } = req.body;
  const user = await User.findOne({ username });
  if (!user || !(await bcrypt.compare(password, user.password)))
    return res.status(400).json({ message: "Invalid credentials" });

  const token = jwt.sign({ id: user._id, role: user.role }, JWT_SECRET, { expiresIn: "1d" });
  res.json({ token, role: user.role });
});

export default router;
