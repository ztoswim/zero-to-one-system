import axios from "axios";
import API_BASE_URL from "./apiConfig";

const AUTH_API_URL = `${API_BASE_URL}/auth`;

export const login = async (username, password) => {
  const res = await axios.post(`${AUTH_API_URL}/login`, { username, password });
  return res.data;
};

export const logout = async () => {
  try {
    await axios.post(`${AUTH_API_URL}/logout`);
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    localStorage.removeItem("username");
  } catch (error) {
    console.error("Logout failed", error);
  }
};
