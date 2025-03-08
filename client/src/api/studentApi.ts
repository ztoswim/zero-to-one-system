import api from "./apiConfig";

// 获取所有学生
export const getStudents = async () => {
  const response = await api.get("/students");
  return response.data;
};

// 获取单个学生
export const getStudentById = async (id: string) => {
  const response = await api.get(`/students/${id}`);
  return response.data;
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
  const response = await api.post("/students", studentData);
  return response.data;
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
  const response = await api.put(`/students/${id}`, studentData);
  return response.data;
};

// 删除学生
export const deleteStudent = async (id: string) => {
  const response = await api.delete(`/students/${id}`);
  return response.data;
};
