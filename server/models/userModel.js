const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true }, // 用户名必须唯一
  password: { type: String, required: true }, // bcrypt 加密存储
  role: { 
    type: String, 
    enum: ["boss", "admin", "coach", "customer"], 
    required: true 
  }, // 角色限定
  email: { type: String, unique: true, sparse: true }, // 允许为空，但如果填了必须唯一
});

const User = mongoose.model("users", userSchema);

module.exports = User;
