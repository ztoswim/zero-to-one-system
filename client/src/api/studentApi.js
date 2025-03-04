import axios from "axios";
import API_URL from "../config"; // ✅ 确保 API_URL 正确

const STUDENT_API = `${API_URL}/api/students`;

/** 🔹 统一错误处理函数 */
const handleApiError = (error, defaultMessage) => {
  console.error(defaultMessage, error.response?.data || error.message);
  
  throw {
    message: error.response?.data?.message || defaultMessage,
    errors: error.response?.data?.errors || {}, // ✅ 兼容 { message: "...", errors: {...} }
  };
};

// 📌 获取所有学生
export const getStudents = async () => {
  try {
    const response = await axios.get(STUDENT_API);
    return response.data;
  } catch (error) {
    handleApiError(error, "获取学生列表失败");
  }
};

// 📌 获取单个学生
export const getStudentById = async (id) => {
  try {
    const response = await axios.get(`${STUDENT_API}/${id}`);
    return response.data;
  } catch (error) {
    handleApiError(error, "获取学生信息失败");
  }
};

// 📌 添加新学生
export const addStudent = async (studentData) => {
  try {
    const response = await axios.post(STUDENT_API, studentData);
    return response.data;
  } catch (error) {
    handleApiError(error, "添加学生失败");
  }
};

// 📌 更新学生信息
export const updateStudent = async (id, studentData) => {
  try {
    const response = await axios.put(`${STUDENT_API}/${id}`, studentData);
    return response.data;
  } catch (error) {
    handleApiError(error, "更新学生信息失败");
  }
};

// 📌 删除学生
export const deleteStudent = async (id) => {
  try {
    const response = await axios.delete(`${STUDENT_API}/${id}`);
    return response.data; // ✅ 确保前端能接收成功删除的反馈
  } catch (error) {
    handleApiError(error, "删除学生失败");
  }
};
