const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");
require("dotenv").config();

// 初始化 Express
const app = express();

// 中间件
app.use(
    cors({
      origin: "https://ztoswim.vercel.app", // 允许 Vercel 前端访问
      credentials: true, // 允许携带 Cookie 或身份凭证
      methods: "GET,POST,PUT,DELETE,OPTIONS", 
      allowedHeaders: "Content-Type,Authorization",
    })
  );  
app.use(express.json());

// 连接数据库
connectDB();

// 路由
app.use("/api/auth", require("./routes/authRoutes")); // 认证 API（登录、注册、修改密码）
app.use("/api/users", require("./routes/userRoutes")); // 用户管理 API（获取、更新、删除用户）
app.use("/api/students", require("./routes/studentRoutes")); // 学生管理 API

// 监听端口
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`✅ Server running on port ${PORT}`));
