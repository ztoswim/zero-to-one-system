const express = require("express");
const bcrypt = require("bcrypt");
const User = require("../models/userModel");

const router = express.Router();

// 📌 1️⃣ 获取所有用户
router.get("/", async (req, res) => {
  try {
    const users = await User.find({}, "-password"); // 不返回密码
    res.json(users);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// 📌 2️⃣ 获取单个用户
router.get("/:username", async (req, res) => {
  try {
    const user = await User.findOne({ username: req.params.username }, "-password");
    if (!user) return res.status(404).json({ message: "User not found" });
    res.json(user);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// 📌 3️⃣ 注册新用户
router.post("/", async (req, res) => {
  const { username, password, role, email } = req.body;

  // 检查用户是否存在
  const existingUser = await User.findOne({ username });
  if (existingUser) return res.status(400).json({ message: "Username already exists" });

  // 加密密码
  const hashedPassword = await bcrypt.hash(password, 10);

  const newUser = new User({
    username,
    password: hashedPassword,
    role,
    email: email || null
  });

  try {
    const savedUser = await newUser.save();
    res.status(201).json({ message: "User created successfully", user: savedUser });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// 📌 4️⃣ 登录验证
router.post("/login", async (req, res) => {
  const { username, password } = req.body;

  const user = await User.findOne({ username });
  if (!user) return res.status(404).json({ message: "User not found" });

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) return res.status(401).json({ message: "Invalid credentials" });

  res.json({ message: "Login successful", user: { username: user.username, role: user.role } });
});

// 📌 5️⃣ 更新用户信息
router.put("/:username", async (req, res) => {
  try {
    const updatedUser = await User.findOneAndUpdate(
      { username: req.params.username },
      req.body,
      { new: true }
    );
    if (!updatedUser) return res.status(404).json({ message: "User not found" });
    res.json(updatedUser);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// 📌 6️⃣ 删除用户
router.delete("/:username", async (req, res) => {
  try {
    const deletedUser = await User.findOneAndDelete({ username: req.params.username });
    if (!deletedUser) return res.status(404).json({ message: "User not found" });
    res.json({ message: "User deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
