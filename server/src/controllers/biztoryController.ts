import { Request, Response } from 'express';
import axios from 'axios';
import User from '../models/User';

const BIZTORY_API_BASE_URL = process.env.BIZTORY_API_BASE_URL;

// 获取银行列表
export const getBankList = async (req: Request, res: Response): Promise<void> => {
  try {
    const userId = req.userId;  // 获取用户 ID

    if (!userId) {
      res.status(401).json({ error: "用户未登录" });
      return;
    }

    const user = await User.findById(userId);
    if (!user || !user.biztoryApiKey) {
      res.status(403).json({ error: "无效的 API Key" });
      return;
    }

    const biztoryApiKey = user.biztoryApiKey;

    // 请求 Biztory API 获取银行列表
    const response = await axios.get(`${BIZTORY_API_BASE_URL}/account/bank/all`, {
      headers: {
        'Api-key': biztoryApiKey,  // 使用 Biztory API Key
      },
    });

    res.json(response.data); // 返回银行列表
  } catch (error) {
    console.error("无法从 Biztory API 获取银行列表", error);
    res.status(500).json({ error: "无法获取银行列表" });
  }
};

// 获取钱包列表
export const getWalletList = async (req: Request, res: Response): Promise<void> => {
  try {
    const userId = req.userId;  // 获取用户 ID

    if (!userId) {
      res.status(401).json({ error: "用户未登录" });
      return;
    }

    const user = await User.findById(userId);
    if (!user || !user.biztoryApiKey) {
      res.status(403).json({ error: "无效的 API Key" });
      return;
    }

    const biztoryApiKey = user.biztoryApiKey;

    // 请求 Biztory API 获取钱包列表
    const response = await axios.get(`${BIZTORY_API_BASE_URL}/account`, {
      headers: {
        'Api-key': biztoryApiKey,  // 使用 Biztory API Key
      },
    });

    res.json(response.data); // 返回钱包列表
  } catch (error) {
    console.error("无法从 Biztory API 获取钱包列表", error);
    res.status(500).json({ error: "无法获取钱包列表" });
  }
};

// 新增钱包
export const createWallet = async (req: Request, res: Response): Promise<void> => {
  try {
    const { name, desc, in_cashflow, reconcilable, type, coa, bank_id } = req.body;

    if (!name || !type) {
      res.status(400).json({ error: "缺少必要的字段" });
      return;
    }

    const userId = req.userId;  // 获取用户 ID

    if (!userId) {
      res.status(401).json({ error: "用户未登录" });
      return;
    }

    const user = await User.findById(userId);
    if (!user || !user.biztoryApiKey) {
      res.status(403).json({ error: "无效的 API Key" });
      return;
    }

    const biztoryApiKey = user.biztoryApiKey;

    // 请求 Biztory API 创建新钱包
    const response = await axios.post(`${BIZTORY_API_BASE_URL}/account`, {
      name,
      desc,
      in_cashflow,
      reconcilable,
      type,
      coa,
      bank_id,
    }, {
      headers: {
        'Api-key': biztoryApiKey,  // 使用 Biztory API Key
      },
    });

    res.json(response.data); // 返回创建的结果
  } catch (error) {
    console.error("无法创建钱包", error);
    res.status(500).json({ error: "创建钱包失败" });
  }
};

// 获取销售发票分页列表
export const getSaleInvoices = async (req: Request, res: Response): Promise<void> => {
    const { _q, filter, page } = req.query;
  
    const userId = req.userId;
  
    if (!userId) {
      res.status(401).json({ error: "用户未登录" });
      return;
    }
  
    const user = await User.findById(userId);
    if (!user || !user.biztoryApiKey) {
      res.status(403).json({ error: "无效的 API Key" });
      return;
    }
  
    const biztoryApiKey = user.biztoryApiKey;
  
    // 构建请求参数
    let params: any = {
      _q: _q || "",
      filter: filter || "",
      page: page || 1,
    };
  
    try {
      // 请求 Biztory API 获取销售发票
      const response = await axios.get(`${BIZTORY_API_BASE_URL}/sale`, {
          headers: {
            'Api-key': biztoryApiKey,  // 使用 Biztory API Key
          },
          params, // 附加的查询参数
        }
      );
  
      // 返回发票列表数据
      res.json(response.data);
    } catch (error) {
      console.error("无法从 Biztory API 获取销售发票", error);
      res.status(500).json({ error: "无法获取销售发票" });
    }
  };