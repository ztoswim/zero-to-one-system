require("dotenv").config();
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const connectDB = require("./config/db");

const app = express();

// 允许前端访问后端
app.use(cors({ origin: "https://zero-to-one-system.vercel.app" }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// 连接数据库
connectDB();

// 测试服务器是否运行
app.get("/", (req, res) => {
  res.send("Server is running!");
});

// 测试数据库是否连接成功
app.get("/test-db", async (req, res) => {
  try {
    const users = await mongoose.connection.db.collection("users").find().toArray();
    res.json(users);
  } catch (err) {
    res.status(500).json({ error: "Database connection error" });
  }
});

// 服务器端口
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
