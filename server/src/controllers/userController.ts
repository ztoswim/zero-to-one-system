import { Request, Response } from 'express';
import User from '../models/User';

// 获取当前用户信息
export const getUserInfo = async (req: Request, res: Response): Promise<void> => {
  try {
    const userId = (req as any).userId;  // 从 request 中获取扩展的 userId
    const user = await User.findById(userId);
    
    if (!user) {
      res.status(404).json({ error: "用户未找到" });
      return;
    }
    
    res.json(user);
  } catch (error) {
    res.status(500).json({ error: "获取用户信息失败" });
  }
};

// 更新用户信息
export const updateUserInfo = async (req: Request, res: Response): Promise<void> => {
  const { username } = req.body;
  try {
    const updatedUser = await User.findByIdAndUpdate(req.params.id, { username }, { new: true });
    
    if (!updatedUser) {
      res.status(404).json({ error: "用户未找到" });
      return;
    }

    res.json({ message: "用户信息更新成功", user: updatedUser });
  } catch (error) {
    res.status(500).json({ error: "更新用户信息失败" });
  }
};

// 删除用户
export const deleteUser = async (req: Request, res: Response): Promise<void> => {
  try {
    const deletedUser = await User.findByIdAndDelete(req.params.id);
    
    if (!deletedUser) {
      res.status(404).json({ error: "用户未找到" });
      return;
    }

    res.json({ message: "用户已删除" });
  } catch (error) {
    res.status(500).json({ error: "删除用户失败" });
  }
};
