const jwt = require("jsonwebtoken");
const User = require("../models/User");
require("dotenv").config();

// 验证 JWT
const protect = async (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];

    if (!token) {
      return res.status(401).json({ message: "未授权访问" });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = await User.findById(decoded.id).select("-password");
    next();
  } catch (error) {
    res.status(401).json({ message: "无效的 Token" });
  }
};

// 角色权限验证
const authorize = (roles) => (req, res, next) => {
  if (!roles.includes(req.user.role)) {
    return res.status(403).json({ message: "权限不足" });
  }
  next();
};

module.exports = { protect, authorize };
