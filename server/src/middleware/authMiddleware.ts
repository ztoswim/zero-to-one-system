import { Request, Response, NextFunction } from "express";

interface AuthRequest extends Request {
  user?: any; // Add your user type here
}

const authMiddleware = (req: AuthRequest, res: Response, next: NextFunction): void => {
  // Authentication logic here
  const authenticated = req.user != null; // Example logic, replace with your own
  if (authenticated) {
    next();
  } else {
    res.status(401).json({ error: "Unauthorized" });
  }
};

export default authMiddleware;