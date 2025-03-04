import axios from "axios";
import API_URL from "../config"; // ✅ 直接引入 API 配置

const USER_API = `${API_URL}/api/users`; // 统一 API 地址

// 用户登录
export const loginUser = async (userData) => {
  const response = await axios.post(`${USER_API}/login`, userData);
  return response.data;
};

// 用户注册
export const registerUser = async (userData) => {
  const response = await axios.post(`${USER_API}/register`, userData);
  return response.data;
};

// 获取所有用户
export const getUsers = async () => {
  const response = await axios.get(USER_API);
  return response.data;
};

// 编辑用户
export const updateUser = async (id, userData) => {
  const response = await axios.put(`${USER_API}/${id}`, userData);
  return response.data;
};

// 删除用户
export const deleteUser = async (id) => {
  await axios.delete(`${USER_API}/${id}`);
};
