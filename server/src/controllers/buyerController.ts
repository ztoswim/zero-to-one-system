// src/controllers/buyerController.ts

import Buyer from '../models/Buyer';

// 获取买家列表
export const getBuyers = async (req: any, res: any): Promise<void> => {
  try {
    const buyers = await Buyer.find();
    res.json(buyers);
  } catch (error) {
    console.error('无法获取买家列表', error);
    res.status(500).json({ message: '无法获取买家列表', error });
  }
};

// 创建新买家
export const createBuyer = async (req: any, res: any): Promise<void> => {
  try {
    const { name, tin, registrationNumber, registrationScheme, sst, email, contact, address } = req.body;

    // 创建新的买家对象
    const newBuyer = new Buyer({
      name,
      tin,
      registrationNumber,
      registrationScheme,
      sst,
      email,
      contact,
      address,
    });

    // 保存买家数据
    await newBuyer.save();
    res.status(201).json(newBuyer);
  } catch (error) {
    console.error('无法创建买家', error);
    res.status(500).json({ message: '无法创建买家', error });
  }
};
