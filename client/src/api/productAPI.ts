import api from './apiConfig';  // 引入之前定义的 api 实例
import { toast } from 'react-toastify';

// 获取商品列表
export const getProducts = async () => {
  try {
    const response = await api.get('/product-item');  // 获取商品数据
    return response.data;
  } catch (error) {
    console.error('获取商品列表失败', error);
    toast.error('获取商品列表失败');
    throw error; // 让错误上抛，便于在调用处处理
  }
};

// 创建新商品
export const createProduct = async (productData: any) => {
  try {
    const response = await api.post('/product-item', productData);  // 发送新商品数据
    toast.success('商品创建成功');
    return response.data;
  } catch (error) {
    console.error('创建商品失败', error);
    toast.error('创建商品失败');
    throw error; // 让错误上抛
  }
};

// 编辑商品
export const updateProduct = async (productId: string, productData: any) => {
  try {
    const response = await api.put(`/product-item/${productId}`, productData);  // 更新商品数据
    toast.success('商品更新成功');
    return response.data;
  } catch (error) {
    console.error('更新商品失败', error);
    toast.error('更新商品失败');
    throw error;
  }
};

// 删除商品
export const deleteProduct = async (productId: string) => {
  try {
    const response = await api.delete(`/product-item/${productId}`);  // 删除商品数据
    toast.success('商品删除成功');
    return response.data;
  } catch (error) {
    console.error('删除商品失败', error);
    toast.error('删除商品失败');
    throw error;
  }
};
