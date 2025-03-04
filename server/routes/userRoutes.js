const express = require("express");
const bcrypt = require("bcryptjs");
const User = require("../models/userModel");
const Student = require("../models/studentModel");

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

/** 📌 3️⃣ 登录 */
router.post("/login", async (req, res) => {
  try {
    const { username, password } = req.body;

    const user = await User.findOne({ username });
    if (!user) return res.status(404).json({ message: "用户不存在" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(401).json({ message: "密码错误" });

    res.json({ message: "登录成功", user: { username: user.username, role: user.role } });
  } catch (err) {
    res.status(500).json({ message: "登录失败", error: err.message });
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
router.post("/register-admin", async (req, res) => {
  try {
    const { bossUsername, email, username, password, role } = req.body;

    // 检查操作者是否是 Boss
    const bossUser = await User.findOne({ username: bossUsername });
    if (!bossUser || bossUser.role !== "boss") {
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
router.put("/:username", async (req, res) => {
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
router.delete("/:username", async (req, res) => {
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

module.exports = router;
