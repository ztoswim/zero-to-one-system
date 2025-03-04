const User = require("../models/User");
const Student = require("../models/Student");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
require("dotenv").config();

// 生成 JWT
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "7d" });
};

// 用户注册（顾客）
const registerCustomer = async (req, res) => {
  const { email, username, password, confirmPassword } = req.body;

  if (password !== confirmPassword) {
    return res.status(400).json({ message: "两次输入的密码不一致" });
  }

  // 检查 students 是否存在该 email
  const studentExists = await Student.findOne({ email });
  if (!studentExists) {
    return res.status(400).json({ message: "该邮箱未登记为学生" });
  }

  // 检查 users 是否已经注册
  const userExists = await User.findOne({ email });
  if (userExists) {
    return res.status(400).json({ message: "该邮箱已被注册" });
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  const user = await User.create({ email, username, password: hashedPassword, role: "customer" });

  res.status(201).json({ token: generateToken(user._id), role: user.role });
};

// 用户注册（Boss 添加员工）
const registerEmployee = async (req, res) => {
  const { username, password, role } = req.body;

  if (!["boss", "admin", "coach"].includes(role)) {
    return res.status(400).json({ message: "无效的角色" });
  }

  const userExists = await User.findOne({ username });
  if (userExists) {
    return res.status(400).json({ message: "该用户名已被使用" });
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  const user = await User.create({ username, password: hashedPassword, role });

  res.status(201).json({ message: "员工账号创建成功" });
};

// 用户登录
const loginUser = async (req, res) => {
    const { username, password } = req.body;
  
    // 忽略大小写进行匹配
    const user = await User.findOne({ username: { $regex: new RegExp(`^${username}$`, "i") } });
  
    if (!user) {
      return res.status(400).json({ message: "用户名或密码错误" });
    }
  
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "用户名或密码错误" });
    }
  
    res.json({
      _id: user._id,
      username: user.username,
      role: user.role,
      token: generateToken(user._id),
    });
  };

// 获取用户信息
const getUserProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user._id).select("-password");
    if (!user) {
      return res.status(404).json({ message: "用户不存在" });
    }
    res.json(user);
  } catch (err) {
    res.status(500).json({ message: "服务器错误" });
  }
};


// 修改密码（顾客）
const resetPassword = async (req, res) => {
  const { email, username, newPassword, confirmPassword } = req.body;

  if (newPassword !== confirmPassword) {
    return res.status(400).json({ message: "两次输入的密码不一致" });
  }

  const user = await User.findOne({ email, username });
  if (!user) {
    return res.status(404).json({ message: "用户不存在" });
  }

  user.password = await bcrypt.hash(newPassword, 10);
  await user.save();
  res.json({ message: "密码已更新" });
};

// Boss 编辑员工信息
const updateEmployee = async (req, res) => {
  const { userId, role } = req.body;

  if (!["admin", "coach"].includes(role)) {
    return res.status(400).json({ message: "无效的角色" });
  }

  const user = await User.findById(userId);
  if (!user) {
    return res.status(404).json({ message: "用户不存在" });
  }

  user.role = role;
  await user.save();
  res.json({ message: "用户信息已更新" });
};

// 删除用户（仅 Boss）
const deleteUser = async (req, res) => {
  const { userId } = req.params;

  const user = await User.findById(userId);
  if (!user) {
    return res.status(404).json({ message: "用户不存在" });
  }

  await user.remove();
  res.json({ message: "用户已删除" });
};

module.exports = {
  registerCustomer,
  registerEmployee,
  loginUser,
  getUserProfile,
  resetPassword,
  updateEmployee,
  deleteUser,
};
