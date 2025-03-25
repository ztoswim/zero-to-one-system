import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/User";
import axios from 'axios';
import md5 from 'md5';
import Student from "../models/Student";

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

// 登录控制器
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

  let biztoryAccount = null;

  // 检查是否有 Biztory 信息，如果有则尝试登录 Biztory
  if (user.biztoryApiKey && user.biztoryUserId && user.biztoryUsername) {
    // 拼接 Biztory 登录密码
    const concatenatedString = `${user.biztoryUsername}${user.biztoryApiKey}`;
    const md5Output = md5(concatenatedString);
    const passwordForBiztory = `${user.biztoryUserId}_${md5Output}`;

    // 进行 Biztory 登录
    const requestBody = {
      name: user.biztoryUsername,
      password: passwordForBiztory,
    };

    try {
      const biztoryResponse = await axios.post('https://zerotooone.biztory.com.my/api_v1/api_login', requestBody);

      if (biztoryResponse.status === 200) {
        console.log('成功登录 Biztory');
        biztoryAccount = biztoryResponse.data; // 保存 Biztory 返回的账户信息
      } else {
        console.error('Biztory 登录失败', biztoryResponse.status);
        res.status(401).json({ error: "Biztory 登录失败" });
        return;
      }
    } catch (error) {
      console.error('Biztory 登录请求失败', error);
      res.status(500).json({ error: "Biztory 登录请求失败" });
      return;
    }
  }

  // 生成 JWT token
  const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET!, { expiresIn: "7d" });

  // 返回 JWT Token 和 Biztory 账户信息（如果有）
  res.json({ token, role: user.role, biztoryAccount });
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
