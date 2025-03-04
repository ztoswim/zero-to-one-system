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
