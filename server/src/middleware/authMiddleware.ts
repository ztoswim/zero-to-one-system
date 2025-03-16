import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

// 扩展 Request 类型
interface AuthRequest extends Request {
  userId?: string;  // 在这里明确声明 userId
}

const authMiddleware = (req: AuthRequest, res: Response, next: NextFunction): void => {
  // 假设我们从请求头中获取用户身份信息，通常是 JWT token
  const token = req.headers.authorization?.split(" ")[1]; // 示例，实际情况下取决于你用的认证方式

  if (token) {
    try {
      // 使用 jwt.verify 解码并验证 token，假设 secretKey 存储在环境变量中
      const decoded: any = jwt.verify(token, process.env.JWT_SECRET!);  // 通过环境变量获取 secret key

      // 提取 userId（你可以根据需要存储更多用户信息）
      req.userId = decoded.id;  // 假设 token 中有一个 id 字段

      next(); // 验证通过，继续执行请求
    } catch (error) {
      res.status(401).json({ error: "Invalid token" });
    }
  } else {
    res.status(401).json({ error: "Unauthorized" });
  }
};

export default authMiddleware;
