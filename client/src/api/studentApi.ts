import api from "./apiConfig";

// 获取所有学生
export const getStudents = async () => {
  try {
    const response = await api.get("/students");
    return response.data.data;  // 确保返回 data 部分
  } catch (error: any) {
    console.error(error);
    throw new Error(error.message || "获取学生数据失败");
  }
};

// 获取单个学生
export const getStudentById = async (id: string) => {
  try {
    const response = await api.get(`/students/${id}`);
    return response.data.data;  // 确保返回 data 部分
  } catch (error: any) {
    console.error(error);
    throw new Error(error.message || "获取学生信息失败");
  }
};

// 创建学生
export const createStudent = async (studentData: {
  studentName: string;
  gender: string;
  birthDate: string;
  parentName?: string;
  parentContact: string;
  address?: string;
  classDuration?: string;
  classLocation?: string;
  email?: string;
}) => {
  try {
    const response = await api.post("/students", studentData);
    return response.data.data;  // 确保返回 data 部分
  } catch (error: any) {
    console.error(error);
    throw new Error(error.message || "创建学生失败");
  }
};

// 更新学生信息
export const updateStudent = async (
  id: string,
  studentData: {
    studentName: string;
    gender: string;
    birthDate: string;
    parentName?: string;
    parentContact: string;
    address?: string;
    classDuration?: string;
    classLocation?: string;
    email?: string;
  }
) => {
  try {
    const response = await api.put(`/students/${id}`, studentData);
    return response.data.data;  // 确保返回 data 部分
  } catch (error: any) {
    console.error(error);
    throw new Error(error.message || "更新学生信息失败");
  }
};

// 删除学生
export const deleteStudent = async (id: string) => {
  try {
    const response = await api.delete(`/students/${id}`);
    return response.data.data;  // 确保返回 data 部分
  } catch (error: any) {
    console.error(error);
    throw new Error(error.message || "删除学生失败");
  }
};
