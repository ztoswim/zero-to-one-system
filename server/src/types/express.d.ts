// src/types/express.d.ts
import { Request } from "express";

declare global {
  namespace Express {
    interface Request {
      userId?: string;  // Add the `userId` property to the Request object
    }
  }
}
