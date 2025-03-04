import axios from "axios";
import API_URL from "../config"; // ✅ 直接引入 API_URL

const STUDENT_API = `${API_URL}/api/students`;

// 获取所有学生
export const getStudents = async () => {
  const response = await axios.get(STUDENT_API);
  return response.data;
};

// 添加新学生
export const addStudent = async (studentData) => {
  const response = await axios.post(STUDENT_API, studentData);
  return response.data;
};

// 更新学生信息
export const updateStudent = async (id, studentData) => {
  const response = await axios.put(`${STUDENT_API}/${id}`, studentData);
  return response.data;
};

// 删除学生
export const deleteStudent = async (id) => {
  await axios.delete(`${STUDENT_API}/${id}`);
};
