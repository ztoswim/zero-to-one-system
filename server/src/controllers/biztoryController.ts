import { Request, Response } from 'express';
import axios from 'axios';
import User from '../models/User';  // 假设你有一个用户模型

// 使用环境变量中的 API URL
const BIZTORY_API_BASE_URL = process.env.BIZTORY_API_BASE_URL;

// 获取银行列表
export const getBankList = async (req: Request, res: Response): Promise<void> => {
  try {
    const userId = req.user?.id;  // 假设你从 JWT 中获取当前用户的 ID

    if (!userId) {
      res.status(401).json({ error: "用户未登录" });
      return;
    }

    // 从数据库中获取用户的 Biztory API Key
    const user = await User.findById(userId);
    if (!user || !user.biztoryApiKey) {
      res.status(403).json({ error: "无效的 API Key" });
      return;
    }

    const biztoryApiKey = user.biztoryApiKey;

    // 请求 Biztory API 获取银行列表
    const response = await axios.get(`${BIZTORY_API_BASE_URL}/account/bank/all`, {
      headers: {
        'Api-key': biztoryApiKey,  // 使用从用户数据库中获取的 API Key
      },
    });

    // 返回 Biztory API 的数据给前端
    res.json(response.data);
  } catch (error) {
    console.error('无法从 Biztory API 获取银行列表', error);
    res.status(500).json({ error: '无法获取银行列表' });
  }
};
