const jwt = require('jsonwebtoken');

const authenticateUser = (req, res, next) => {
  // 从请求头中获取 token
  const token = req.headers.authorization?.split(" ")[1];
  
  // 如果没有 token
  if (!token) return res.status(401).json({ message: "请登录" });

  // 验证 token
  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) return res.status(403).json({ message: "无效的 token" });

    // 如果验证通过，将解码后的用户信息存储到请求中
    req.user = decoded;  
    next();
  });
};

module.exports = authenticateUser;
