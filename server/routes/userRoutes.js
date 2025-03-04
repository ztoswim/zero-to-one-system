const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken"); // 引入 jwt
const User = require("../models/userModel");
const Student = require("../models/studentModel");
const authenticateUser = require("../middlewares/auth");  // 引入身份验证中间件

const router = express.Router();

/** 📌 1️⃣ 获取所有用户（不返回密码） */
router.get("/", async (req, res) => {
  try {
    const users = await User.find({}, "-password");
    res.json(users);
  } catch (err) {
    res.status(500).json({ message: "获取用户失败", error: err.message });
  }
});

/** 📌 2️⃣ 获取单个用户 */
router.get("/:username", async (req, res) => {
  try {
    const user = await User.findOne({ username: req.params.username }, "-password");
    if (!user) return res.status(404).json({ message: "用户不存在" });
    res.json(user);
  } catch (err) {
    res.status(500).json({ message: "查询失败", error: err.message });
  }
});

// **用户登录**
router.post("/login", async (req, res) => {
  const { username, password } = req.body;
  try {
    const user = await User.findOne({ username });
    if (!user) return res.status(400).json({ message: "用户不存在" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: "密码错误" });

    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    res.json({ token, user: { id: user._id, username: user.username, role: user.role } });
  } catch (err) {
    res.status(500).json({ message: "服务器错误" });
  }
});

// **获取当前用户信息**
router.get("/me", authMiddleware, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");
    res.json(user);
  } catch (err) {
    res.status(500).json({ message: "服务器错误" });
  }
});

/** 📌 4️⃣ 注册 - 方式 1（仅学生可注册，自动设为 customer） */
router.post("/register-student", async (req, res) => {
  try {
    const { email, username, password, confirmPassword } = req.body;

    if (password !== confirmPassword) {
      return res.status(400).json({ message: "两次输入的密码不一致" });
    }

    // 检查 student_info 是否有这个邮箱
    const studentExists = await Student.findOne({ email });
    if (!studentExists) {
      return res.status(400).json({ message: "该邮箱未注册学生信息" });
    }

    // 检查 users 数据库是否已经注册
    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ message: "该邮箱已注册" });
    }

    // 加密密码
    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      username,
      password: hashedPassword,
      role: "customer",
      email
    });

    const savedUser = await newUser.save();
    res.status(201).json({ message: "注册成功", user: savedUser });
  } catch (err) {
    res.status(500).json({ message: "注册失败", error: err.message });
  }
});

/** 📌 5️⃣ 注册 - 方式 2（Boss 创建账号，可选角色） */
router.post("/register-admin", authenticateUser, async (req, res) => {
  try {
    const { email, username, password, role } = req.body;

    // 检查操作者是否是 Boss（从当前登录的用户中获取）
    const currentUser = req.user;  // 假设 req.user 包含当前登录用户的信息
    if (!currentUser || currentUser.role !== "boss") {
      return res.status(403).json({ message: "无权限，只有 Boss 可以创建用户" });
    }

    if (!["boss", "admin", "coach", "customer"].includes(role)) {
      return res.status(400).json({ message: "无效的角色" });
    }

    // 检查用户名是否已存在
    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res.status(400).json({ message: "用户名已存在" });
    }

    // 加密密码
    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      username,
      password: hashedPassword,
      role,
      email: email || null
    });

    const savedUser = await newUser.save();
    res.status(201).json({ message: "用户创建成功", user: savedUser });
  } catch (err) {
    res.status(500).json({ message: "注册失败", error: err.message });
  }
});

/** 📌 6️⃣ 更新用户信息 */
router.put("/:username", authenticateUser, async (req, res) => {
  try {
    const { password, ...updateData } = req.body;

    // 如果更新密码，则加密
    if (password) {
      updateData.password = await bcrypt.hash(password, 10);
    }

    const updatedUser = await User.findOneAndUpdate(
      { username: req.params.username },
      updateData,
      { new: true }
    );

    if (!updatedUser) return res.status(404).json({ message: "用户不存在" });

    res.json({ message: "用户更新成功", user: updatedUser });
  } catch (err) {
    res.status(500).json({ message: "更新失败", error: err.message });
  }
});

/** 📌 7️⃣ 删除用户（禁止删除 Boss） */
router.delete("/:username", authenticateUser, async (req, res) => {
  try {
    const user = await User.findOne({ username: req.params.username });

    if (!user) return res.status(404).json({ message: "用户不存在" });

    if (user.role === "boss") {
      return res.status(403).json({ message: "无法删除 Boss 账号" });
    }

    await User.findOneAndDelete({ username: req.params.username });

    res.json({ message: "用户删除成功" });
  } catch (err) {
    res.status(500).json({ message: "删除失败", error: err.message });
  }
});

// 验证 Token
router.post("/verify-token", (req, res) => {
  const token = req.headers.authorization?.split(" ")[1];
  
  if (!token) {
    return res.status(401).json({ message: "Token 缺失" });
  }
  
  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      return res.status(401).json({ message: "Token 无效" });
    }
    
    res.json({ isValid: true });
  });
});


module.exports = router;
