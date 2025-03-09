import jwt from 'jsonwebtoken';
import { NextFunction, Response } from 'express';

const authMiddleware = (req: any, res: Response, next: NextFunction): void => {
  const token = req.header('Authorization')?.replace('Bearer ', '');
  if (!token) {
    res.status(401).json({ success: false, message: 'Access denied. No token provided.' });
    return;
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET!);
    req.user = decoded;
    next();
  } catch (ex) {
    res.status(400).json({ success: false, message: 'Invalid token.' });
  }
};

export default authMiddleware;
