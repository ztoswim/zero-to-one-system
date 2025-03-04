import axios from "axios";
import API_URL from "../config"; // 引入 API 配置

const USER_API = `${API_URL}/api/users`; // 统一 API 地址

// **注册**
export const registerUser = async (userData) => {
  return await axios.post(`${USER_API}/register`, userData);
};

// **登录**
export const loginUser = async (userData) => {
  return await axios.post(`${USER_API}/login`, userData);
};

// **获取当前用户**
export const getCurrentUser = async (token) => {
  return await axios.get(`${USER_API}/me`, {
    headers: { Authorization: token },
  });
};
