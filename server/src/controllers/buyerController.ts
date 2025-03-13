import Buyer from '../models/Buyer';

// 获取买家列表
export const getBuyers = async (req: any, res: any): Promise<void> => {
  try {
    const buyers = await Buyer.find();
    res.json(buyers);
  } catch (error) {
    console.error('无法获取买家列表', error);
    const errorMessage = error instanceof Error ? error.message : '未知错误';
    res.status(500).json({ message: '无法获取买家列表', error: errorMessage });
  }
};

// 创建新买家
export const createBuyer = async (req: any, res: any): Promise<void> => {
  try {
    const { name, tin, registrationNumber, registrationScheme, sst, email, contact, address } = req.body;

    // 确保所有必需的字段存在
    if (!name || !tin || !registrationNumber || !registrationScheme || !sst || !contact || !address) {
      return res.status(400).json({ message: '所有必需的字段必须提供' });
    }

    // 使用 create() 方法创建并保存新买家
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
    console.error('创建买家失败:', error);
    const errorMessage = error instanceof Error ? error.message : '未知错误';
    res.status(500).json({ message: '创建买家失败', error: errorMessage });
  }
};

// 编辑买家
export const updateBuyer = async (req: any, res: any): Promise<void> => {
  try {
    const { buyerId } = req.params;
    const { name, tin, registrationNumber, registrationScheme, sst, email, contact, address } = req.body;

    // 确保所有必需的字段存在
    if (!name || !tin || !registrationNumber || !registrationScheme || !sst || !contact || !address) {
      return res.status(400).json({ message: '所有必需的字段必须提供' });
    }

    const updatedBuyer = await Buyer.findByIdAndUpdate(
      buyerId,
      { name, tin, registrationNumber, registrationScheme, sst, email, contact, address },
      { new: true }
    );

    if (!updatedBuyer) {
      return res.status(404).json({ message: '买家未找到' });
    }

    res.status(200).json(updatedBuyer);
  } catch (error) {
    console.error('更新买家失败:', error);
    const errorMessage = error instanceof Error ? error.message : '未知错误';
    res.status(500).json({ message: '更新买家失败', error: errorMessage });
  }
};

// 删除买家
export const deleteBuyer = async (req: any, res: any): Promise<void> => {
  try {
    const buyer = await Buyer.findByIdAndDelete(req.params.buyerId);
    if (!buyer) {
      return res.status(404).json({ message: '买家未找到' });
    }

    res.json({ message: '买家删除成功' });
  } catch (error) {
    console.error('删除买家失败', error);
    const errorMessage = error instanceof Error ? error.message : '未知错误';
    res.status(500).json({ message: '删除买家失败', error: errorMessage });
  }
};
