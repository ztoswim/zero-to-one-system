const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true, lowercase: true, trim: true },
  password: { type: String, required: true },
  role: { type: String, enum: ["boss", "admin", "coach", "customer"], required: true },
  email: { type: String, unique: true, sparse: true, default: null },
}, { timestamps: true });

// 确保 username 大小写不敏感唯一
userSchema.index({ username: 1 }, { unique: true });

module.exports = mongoose.model("User", userSchema);
