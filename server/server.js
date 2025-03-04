require("dotenv").config();
const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");

const app = express();

// 允许前端访问
app.use(cors({
  origin: "https://zero-to-one-system.vercel.app", // 你的前端地址
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"]
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// 连接数据库
connectDB();

// 测试服务器是否正常运行
app.get("/", (req, res) => {
  res.send("✅ Server is running!");
});

// 📌 引入路由
const userRoutes = require("./routes/userRoutes");
const studentRoutes = require("./routes/studentRoutes"); // ✅ 添加学生路由

app.use("/api/users", userRoutes);
app.use("/api/students", studentRoutes); // ✅ 这里添加

// 服务器监听端口
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
