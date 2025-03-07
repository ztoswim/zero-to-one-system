const User = require("../models/User");
const Student = require("../models/Student");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
require("dotenv").config();

// 生成 JWT
const generateToken = (userId, role) => {
  return jwt.sign({ id: userId, role }, process.env.JWT_SECRET, { expiresIn: "7d" });
};

// 用户登录
const loginUser = async (req, res) => {
  try {
    const { username, password } = req.body;

    // 忽略大小写，确保用户名匹配
    const user = await User.findOne({ username: username.toLowerCase() });
    if (!user) return res.status(401).json({ message: "账号或密码错误" });

    // 检查密码是否匹配
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(401).json({ message: "账号或密码错误" });

    // 生成 JWT token
    const token = generateToken(user._id, user.role);

    res.json({ token, role: user.role }); // 返回 token 和用户角色
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "服务器错误" });
  }
};

// 顾客注册
const registerCustomer = async (req, res) => {
  try {
    const { email, username, password } = req.body;

    // 检查 email 是否存在于学生名单中
    const existingStudent = await Student.findOne({ email });
    if (!existingStudent) return res.status(400).json({ message: "您不在学生名单中，无法注册" });

    // 检查 username 是否已存在
    const existingUser = await User.findOne({ username: username.toLowerCase() });
    if (existingUser) return res.status(400).json({ message: "该账号已被注册" });

    // 哈希密码并创建用户
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({ email, username: username.toLowerCase(), password: hashedPassword, role: "customer" });

    res.status(201).json({ message: "注册成功", userId: user._id });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "服务器错误" });
  }
};

// Boss 注册员工
const registerEmployee = async (req, res) => {
  try {
    const { username, password, role } = req.body;

    // 只有 boss 可以创建 admin 和 coach
    if (!["admin", "coach"].includes(role)) {
      return res.status(400).json({ message: "无效的角色" });
    }

    // 检查 username 是否已存在
    const existingUser = await User.findOne({ username: username.toLowerCase() });
    if (existingUser) return res.status(400).json({ message: "该账号已被注册" });

    // 哈希密码并创建用户
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({ username: username.toLowerCase(), password: hashedPassword, role });

    res.status(201).json({ message: "员工账号创建成功", userId: user._id });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "服务器错误" });
  }
};

// 顾客重置密码
const resetPassword = async (req, res) => {
  try {
    const { email, username, newPassword } = req.body;

    const user = await User.findOne({ email, username: username.toLowerCase() });
    if (!user) return res.status(400).json({ message: "账号或邮箱错误" });

    // 哈希并保存新密码
    user.password = await bcrypt.hash(newPassword, 10);
    await user.save();

    res.json({ message: "密码重置成功" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "服务器错误" });
  }
};

module.exports = {
  loginUser,
  registerCustomer,
  registerEmployee,
  resetPassword,
};
