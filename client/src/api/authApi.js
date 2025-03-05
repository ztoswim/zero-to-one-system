import axios from "axios";
import API_BASE_URL from "./apiConfig";
import { saveUserAuth } from "../auth"; 

const AUTH_API_URL = `${API_BASE_URL}/auth`;

export const login = async (username, password) => {
  try {
    const res = await axios.post(
      `${AUTH_API_URL}/login`, 
      { username, password },
      { withCredentials: true } // 允许发送 Cookie（如果后端需要）
    );

    // 存储 Token 和角色信息
    saveUserAuth(res.data.token, res.data.role);
    
    return res.data.role;
  } catch (error) {
    console.error("登录失败", error.response?.data || error.message);
    throw new Error(error.response?.data?.message || "登录失败");
  }
};