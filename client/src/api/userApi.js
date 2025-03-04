import axios from "axios";
import API_URL from "../config"; // ✅ 直接引入 API 配置

const USER_API = `${API_URL}/api/users`; // 统一 API 地址

// 用户登录
export const loginUser = async (userData) => {
  try {
    const response = await axios.post(`${USER_API}/login`, userData);
    return response.data;
  } catch (error) {
    console.error("登录失败:", error.response?.data || error.message);
    throw error;
  }
};

// 用户注册
export const registerUser = async (userData) => {
  try {
    const response = await axios.post(USER_API, userData); // ✅ 确保和后端路径一致
    return response.data;
  } catch (error) {
    console.error("注册失败:", error.response?.data || error.message);
    throw error;
  }
};

// 获取所有用户
export const getUsers = async () => {
  try {
    const response = await axios.get(USER_API);
    return response.data;
  } catch (error) {
    console.error("获取用户列表失败:", error.response?.data || error.message);
    throw error;
  }
};

// 编辑用户
export const updateUser = async (id, userData) => {
  try {
    const response = await axios.put(`${USER_API}/${id}`, userData);
    return response.data;
  } catch (error) {
    console.error("更新用户失败:", error.response?.data || error.message);
    throw error;
  }
};

// 删除用户
export const deleteUser = async (id) => {
  try {
    const response = await axios.delete(`${USER_API}/${id}`);
    return response.data; // ✅ 确保前端能接收删除成功的信息
  } catch (error) {
    console.error("删除用户失败:", error.response?.data || error.message);
    throw error;
  }
};
