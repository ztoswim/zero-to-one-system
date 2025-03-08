import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import authRoutes from "./routes/authRoutes";
import userRoutes from "./routes/userRoutes";
import studentRoutes from "./routes/studentRoutes";

dotenv.config();
const app = express();

// 中间件
app.use(cors({ origin: "*", credentials: true }));
app.use(express.json());
app.use(cookieParser());

// 路由
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/students", studentRoutes);

// 连接数据库
mongoose
  .connect(process.env.MONGO_URI!)
  .then(() => console.log("MongoDB 连接成功！"))
  .catch((err) => console.error("MongoDB 连接失败", err));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`服务器运行在 http://localhost:${PORT}`));
