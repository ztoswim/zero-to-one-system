import { Request, Response, NextFunction } from "express";

// 扩展 Request 类型
interface AuthRequest extends Request {
  userId?: string;  // 在这里明确声明 userId
}

const authMiddleware = (req: AuthRequest, res: Response, next: NextFunction): void => {
  // 假设我们从请求头中获取用户身份信息，通常是 JWT token
  const token = req.headers.authorization?.split(" ")[1]; // 示例，实际情况下取决于你用的认证方式

  if (token) {
    // 在这里你可以进行 token 验证并从中提取 userId 或整个 user 对象
    // 例如：jwt.verify(token, secretKey) 解码并验证 token
    
    try {
      // 假设解码后得到的 user 数据
      req.userId = "12345"; // 这里是解码出的 userId（根据你自己的实际逻辑）
      next(); // 验证通过，继续执行请求
    } catch (error) {
      res.status(401).json({ error: "Invalid token" });
    }
  } else {
    res.status(401).json({ error: "Unauthorized" });
  }
};

export default authMiddleware;
