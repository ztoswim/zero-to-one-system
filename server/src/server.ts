import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import authRoutes from './routes/authRoutes';
import userRoutes from './routes/userRoutes';
import studentRoutes from './routes/studentRoutes';

dotenv.config();  // 加载环境变量
const app = express();

// 确保 MONGO_URI 环境变量存在
if (!process.env.MONGO_URI) {
  console.error("MONGO_URI 环境变量未定义！");
  process.exit(1); // 如果没有数据库配置，停止服务器启动
}

// 中间件配置
app.use(cors({
  origin: ["http://localhost:5173", "https://ztoswim.vercel.app"],  // 允许的前端请求域名
  credentials: true  // 启用跨域请求时带上凭证（cookie）
}));
app.use(express.json());  // 处理 JSON 格式的请求体
app.use(cookieParser());  // 解析 cookie

// 路由配置
app.use("/api/auth", authRoutes);  // 认证相关路由
app.use("/api/users", userRoutes);  // 用户管理路由
app.use("/api/students", studentRoutes);  // 学生管理路由

// 连接数据库
mongoose
  .connect(process.env.MONGO_URI as string)  // 从环境变量获取数据库连接字符串
  .then(() => {
    console.log("MongoDB 连接成功！");
  })
  .catch((err) => {
    console.error("MongoDB 连接失败", err);
    process.exit(1);  // 如果连接失败，停止服务器启动
  });

// 启动服务器
const PORT = process.env.PORT || 5000;  // 默认端口5000，如果在环境变量中定义了 PORT 就使用它
app.listen(PORT, () => {
  console.log(`🚀 服务器运行在端口 ${PORT}`);
});
