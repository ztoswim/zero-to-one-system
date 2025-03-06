import axios from "axios";
import API_BASE_URL from "./apiConfig";

const STUDENT_API_URL = `${API_BASE_URL}/students`;

export const getStudents = async (token) => {
  const res = await axios.get(STUDENT_API_URL, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.data;
};

export const getStudentById = async (token, studentId) => {
  const res = await axios.get(`${STUDENT_API_URL}/${studentId}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.data;
};

export const createStudent = async (token, studentData) => {
  const res = await axios.post(STUDENT_API_URL, studentData, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.data;
};

export const updateStudent = async (token, studentId, studentData) => {
  const res = await axios.put(`${STUDENT_API_URL}/${studentId}`, studentData, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.data;
};

export const deleteStudent = async (token, studentId) => {
  const res = await axios.delete(`${STUDENT_API_URL}/${studentId}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.data;
};
