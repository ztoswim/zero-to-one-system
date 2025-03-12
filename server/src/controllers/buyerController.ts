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

// 编辑买家
export const updateBuyer = async (req: any, res: any): Promise<void> => {
  try {
    const { name, tin, registrationNumber, registrationScheme, sst, email, contact, address } = req.body;
    const updatedBuyer = await Buyer.findByIdAndUpdate(
      req.params.buyerId,
      { name, tin, registrationNumber, registrationScheme, sst, email, contact, address },
      { new: true }
    );

    if (!updatedBuyer) {
      return res.status(404).json({ message: '买家未找到' });
    }

    res.json(updatedBuyer);
  } catch (error) {
    console.error('更新买家失败', error);
    res.status(500).json({ message: '更新买家失败', error });
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
    res.status(500).json({ message: '删除买家失败', error });
  }
};
