import axios from "axios";
import API_BASE_URL from "./apiConfig";

const USER_API_URL = `${API_BASE_URL}/users`;

export const login = async (username, password) => {
  const res = await axios.post(`${USER_API_URL}/login`, { username, password });
  return res.data;
};

export const getUserInfo = async (token) => {
  const res = await axios.get(`${USER_API_URL}/me`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.data;
};

export const getUserProfile = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get(`${USER_API_URL}/profile`, {
        headers: { Authorization: `Bearer ${token}` },
      });
  
      localStorage.setItem("username", response.data.username);
      localStorage.setItem("role", response.data.role);
      return response.data;
    } catch (error) {
      throw error.response?.data?.message || "获取用户信息失败";
    }
  };