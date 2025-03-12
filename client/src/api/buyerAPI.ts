// src/api/buyerAPI.ts
import api from './apiConfig'; // 引入已经配置好的 api 实例
import { toast } from 'react-toastify';

// 获取买家列表
export const getBuyers = async () => {
  try {
    const response = await api.get('/buyer');  // 确保这个 URL 是 '/buyer'，如果后端使用 '/api/buyer'
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
    const response = await api.post('/buyer', buyerData);  // 创建请求时使用 '/buyer' 作为 URL
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
    const response = await api.put(`/buyer/${buyerId}`, buyerData); // 后端 API 路径 /api/buyer/:buyerId
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
    const response = await api.delete(`/buyer/${buyerId}`); // 后端 API 路径 /api/buyer/:buyerId
    toast.success('买家删除成功');
    return response.data;
  } catch (error) {
    console.error('删除买家失败', error);
    toast.error('删除买家失败');
    throw error;
  }
};
