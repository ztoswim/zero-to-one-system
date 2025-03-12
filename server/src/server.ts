import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import authRoutes from "./routes/authRoutes";
import userRoutes from "./routes/userRoutes";
import studentRoutes from "./routes/studentRoutes";
import invoiceRoutes from "./routes/invoiceRoutes";
import buyerRoutes from './routes/buyerRoutes';

dotenv.config();
const app = express();

// 确保 MONGO_URI 存在
if (!process.env.MONGO_URI) {
  console.error("MONGO_URI 环境变量未定义！");
  process.exit(1); // 如果没有数据库配置，停止服务器启动
}

// 中间件
app.use(cors({ origin: "*", credentials: true }));
app.use(express.json());
app.use(cookieParser());

// 路由
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/students", studentRoutes);
app.use("/api/invoice", invoiceRoutes);
app.use('/api/buyer', buyerRoutes);

// 连接数据库
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB 连接成功！"))
  .catch((err) => console.error("MongoDB 连接失败", err));

// 启动服务器
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 服务器运行在端口 ${PORT}`);
});
