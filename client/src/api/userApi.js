import axios from "axios";
import API_BASE_URL from "./apiConfig";

const USER_API_URL = `${API_BASE_URL}/users`;

// 获取用户信息
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

// Boss 编辑员工信息
export const updateEmployee = async (userId, role, token) => {
  try {
    const res = await axios.put(
      `${USER_API_URL}/update-employee`,
      { userId, role },
      { headers: { Authorization: `Bearer ${token}` } }
    );
    return res.data;
  } catch (error) {
    console.error("更新员工信息失败", error.response?.data || error.message);
    throw new Error(error.response?.data?.message || "更新员工信息失败");
  }
};

// Boss 删除用户
export const deleteUser = async (userId, token) => {
  try {
    const res = await axios.delete(`${USER_API_URL}/${userId}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return res.data;
  } catch (error) {
    console.error("删除用户失败", error.response?.data || error.message);
    throw new Error(error.response?.data?.message || "删除用户失败");
  }
};
