import { apiClient } from "./apiConfig";

// 定义学生数据类型
export interface Student {
  studentName: string;
  gender: string;
  birthDate: string;
  parentName: string;
  parentContact: string;
  address: string;
  classDuration: string;
  classLocation: string;
  email: string;
}

// 获取所有学生
export const getStudents = async (): Promise<Student[]> => {
  const { data } = await apiClient.get<Student[]>("/students");
  return data; // ✅ 只返回 data
};

// 根据 ID 获取学生
export const getStudentById = async (studentId: string): Promise<Student> => {
  const { data } = await apiClient.get<Student>(`/students/${studentId}`);
  return data;
};

// 创建学生
export const createStudent = async (studentData: Student): Promise<Student> => {
  const { data } = await apiClient.post<Student>("/students", studentData);
  return data;
};

// 更新学生
export const updateStudent = async (studentId: string, studentData: Partial<Student>): Promise<Student> => {
  const { data } = await apiClient.put<Student>(`/students/${studentId}`, studentData);
  return data;
};

// 删除学生
export const deleteStudent = async (studentId: string): Promise<{ message: string }> => {
  const { data } = await apiClient.delete<{ message: string }>(`/students/${studentId}`);
  return data;
};
