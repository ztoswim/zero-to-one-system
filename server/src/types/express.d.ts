// src/types/express.d.ts

import { Request } from "express";

// 扩展 Express Request 类型
declare global {
  namespace Express {
    interface Request {
      user?: { id: string; [key: string]: any }; // 在这里定义 user 属性，确保它存在
    }
  }
}
