import api from './apiConfig'; // 引入之前定义的 api 实例
import { toast } from 'react-toastify';

// 获取买家列表
export const getBuyers = async () => {
  try {
    const response = await api.get('/buyers'); // 获取买家数据
    return response.data;
  } catch (error) {
    console.error('获取买家列表失败', error);
    toast.error('获取买家列表失败');
    throw error;
  }
};

// 创建新买家
export const createBuyer = async (buyerData: any) => {
  try {
    const response = await api.post('/buyers', buyerData); // 发送新买家数据
    toast.success('买家创建成功');
    return response.data;
  } catch (error) {
    console.error('创建买家失败', error);
    toast.error('创建买家失败');
    throw error;
  }
};

// 编辑买家
export const updateBuyer = async (buyerId: string, buyerData: any) => {
  try {
    const response = await api.put(`/buyers/${buyerId}`, buyerData); // 更新买家数据
    toast.success('买家更新成功');
    return response.data;
  } catch (error) {
    console.error('更新买家失败', error);
    toast.error('更新买家失败');
    throw error;
  }
};

// 删除买家
export const deleteBuyer = async (buyerId: string) => {
  try {
    const response = await api.delete(`/buyers/${buyerId}`); // 删除买家数据
    toast.success('买家删除成功');
    return response.data;
  } catch (error) {
    console.error('删除买家失败', error);
    toast.error('删除买家失败');
    throw error;
  }
};
