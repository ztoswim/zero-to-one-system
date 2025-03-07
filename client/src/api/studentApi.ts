import { apiClient } from "./apiConfig";

const STUDENT_API_URL = "/students";

export const getStudents = async (token: string) => {
  const { data } = await apiClient.get(STUDENT_API_URL, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return data;
};

export const getStudentById = async (token: string, studentId: string) => {
  const { data } = await apiClient.get(`${STUDENT_API_URL}/${studentId}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return data;
};

export const createStudent = async (token: string, studentData: object) => {
  const { data } = await apiClient.post(STUDENT_API_URL, studentData, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return data;
};

export const updateStudent = async (token: string, studentId: string, studentData: object) => {
  const { data } = await apiClient.put(`${STUDENT_API_URL}/${studentId}`, studentData, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return data;
};

export const deleteStudent = async (token: string, studentId: string) => {
  const { data } = await apiClient.delete(`${STUDENT_API_URL}/${studentId}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return data;
};