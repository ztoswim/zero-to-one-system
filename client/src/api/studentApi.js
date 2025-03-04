import axios from "axios";
import API_URL from "../config"; // ✅ 确保 API_URL 是正确的

const STUDENT_API = `${API_URL}/api/students`;

// 获取所有学生
export const getStudents = async () => {
  try {
    const response = await axios.get(STUDENT_API);
    return response.data;
  } catch (error) {
    console.error("获取学生列表失败:", error.response?.data || error.message);
    throw error;
  }
};

// 添加新学生
export const addStudent = async (studentData) => {
  try {
    const response = await axios.post(STUDENT_API, studentData);
    return response.data;
  } catch (error) {
    console.error("添加学生失败:", error.response?.data || error.message);
    throw error;
  }
};

// 更新学生信息
export const updateStudent = async (id, studentData) => {
  try {
    const response = await axios.put(`${STUDENT_API}/${id}`, studentData);
    return response.data;
  } catch (error) {
    console.error("更新学生信息失败:", error.response?.data || error.message);
    throw error;
  }
};

// 删除学生
export const deleteStudent = async (id) => {
  try {
    const response = await axios.delete(`${STUDENT_API}/${id}`);
    return response.data; // ✅ 让前端接收成功删除的反馈
  } catch (error) {
    console.error("删除学生失败:", error.response?.data || error.message);
    throw error;
  }
};
