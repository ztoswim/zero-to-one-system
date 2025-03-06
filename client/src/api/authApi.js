import axios from "axios";
import API_BASE_URL from "./apiConfig";
import { saveUserAuth } from "../auth"; 

const AUTH_API_URL = `${API_BASE_URL}/auth`;

// 登录
export const login = async (username, password) => {
  try {
    const res = await axios.post(
      `${AUTH_API_URL}/login`, 
      { username, password },
      { withCredentials: true }
    );
    saveUserAuth(res.data.token, res.data.role);
    return res.data.role;
  } catch (error) {
    console.error("登录失败", error.response?.data || error.message);
    throw new Error(error.response?.data?.message || "登录失败");
  }
};

// 顾客注册
export const registerCustomer = async (email, username, password) => {
  try {
    const res = await axios.post(`${AUTH_API_URL}/register/customer`, {
      email,
      username,
      password,
    });
    return res.data;
  } catch (error) {
    console.error("注册失败", error.response?.data || error.message);
    throw new Error(error.response?.data?.message || "注册失败");
  }
};

// Boss 注册员工
export const registerEmployee = async (username, password, role, token) => {
  try {
    const res = await axios.post(
      `${AUTH_API_URL}/register/employee`,
      { username, password, role },
      { headers: { Authorization: `Bearer ${token}` } }
    );
    return res.data;
  } catch (error) {
    console.error("员工注册失败", error.response?.data || error.message);
    throw new Error(error.response?.data?.message || "员工注册失败");
  }
};

// 重置密码
export const resetPassword = async (email, username, newPassword) => {
  try {
    const res = await axios.put(`${AUTH_API_URL}/reset-password`, {
      email,
      username,
      newPassword,
    });
    return res.data;
  } catch (error) {
    console.error("密码重置失败", error.response?.data || error.message);
    throw new Error(error.response?.data?.message || "密码重置失败");
  }
};
