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

    await newBuyer.save();
    res.status(201).json(newBuyer);
  } catch (error) {
    console.error('无法创建买家', error);
    res.status(500).json({ message: '无法创建买家', error });
  }
};

// 编辑买家信息
export const updateBuyer = async (req: any, res: any): Promise<void> => {
  try {
    const { buyerId } = req.params;
    const { name, tin, registrationNumber, registrationScheme, sst, email, contact, address } = req.body;

    const updatedBuyer = await Buyer.findByIdAndUpdate(buyerId, {
      name,
      tin,
      registrationNumber,
      registrationScheme,
      sst,
      email,
      contact,
      address,
    }, { new: true });

    if (!updatedBuyer) {
      res.status(404).json({ message: "找不到该买家" });
      return;
    }

    res.json(updatedBuyer);
  } catch (error) {
    console.error('无法更新买家', error);
    res.status(500).json({ message: '无法更新买家', error });
  }
};

// 删除买家
export const deleteBuyer = async (req: any, res: any): Promise<void> => {
  try {
    const { buyerId } = req.params;

    const deletedBuyer = await Buyer.findByIdAndDelete(buyerId);
    if (!deletedBuyer) {
      res.status(404).json({ message: "找不到该买家" });
      return;
    }

    res.json({ message: '买家删除成功' });
  } catch (error) {
    console.error('无法删除买家', error);
    res.status(500).json({ message: '无法删除买家', error });
  }
};
