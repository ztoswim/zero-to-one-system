const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true }, // 用户名必须唯一
  password: { type: String, required: true }, // bcrypt 加密存储
  role: { 
    type: String, 
    enum: ["boss", "admin", "coach", "customer"], 
    required: true 
  }, // 角色限定
  email: { type: String, unique: true, sparse: true } // 允许为空，但如果填了必须唯一
});

// 📌 在保存前加密密码
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next(); // 如果密码没有修改，就不加密
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

// 📌 添加一个方法来验证密码
userSchema.methods.comparePassword = async function (inputPassword) {
  return bcrypt.compare(inputPassword, this.password);
};

const User = mongoose.model("users", userSchema);

module.exports = User;
