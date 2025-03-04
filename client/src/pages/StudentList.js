import React, { useState, useEffect } from "react";
import StudentInfo from "./StudentInfo";
import { getStudents } from "../api/studentApi";
import "../styles/StudentList.css";

const StudentList = ({ userRole }) => {
  const [students, setStudents] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [showStudentInfo, setShowStudentInfo] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [successMessage, setSuccessMessage] = useState("");
  const [loading, setLoading] = useState(false);

  // ✅ 获取学生数据
  const fetchStudents = async () => {
    setLoading(true);
    try {
      const data = await getStudents();
      setStudents(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error("❌ 获取学生数据失败:", err);
      setStudents([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStudents();
  }, []);

  // ✅ 监听 students 变化后再显示 successMessage，避免 UI 闪烁
  useEffect(() => {
    if (students.length > 0 && successMessage) {
      setTimeout(() => setSuccessMessage(""), 2000);
    }
  }, [students]);

  const handleStudentUpdated = async () => {
    setShowStudentInfo(false);
    await fetchStudents();
    setSuccessMessage("✅ 学生信息更新成功！");
  };

  // ✅ 过滤学生列表
  const filteredStudents = students.filter((student) =>
    student.studentName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="student-list-container">
      <div className="header">
        <div className="title-container">
          <h2 className="title">学生列表</h2>
          <span className="student-count">{students.length}</span>
        </div>
        <div className="search-create-container">
          <input
            type="text"
            className="search-input"
            placeholder="🔍 搜索学生..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <button
            className="create-button"
            onClick={() => {
              setSelectedStudent(null);
              setShowStudentInfo(true);
            }}
          >
            新建
          </button>
        </div>
      </div>

      <hr className="divider" />

      {successMessage && <p className="success-message">{successMessage}</p>}

      {loading ? (
        <p className="loading-text">⏳ 加载中...</p>
      ) : filteredStudents.length === 0 ? (
        <p className="no-data">❌ 没有找到匹配的学生</p>
      ) : (
        <div className="student-list">
          {filteredStudents.map((student) => (
            <button
              key={student._id}
              className="student-item"
              onClick={() => {
                setSelectedStudent(student);
                setShowStudentInfo(true);
              }}
            >
              {student.studentName}
            </button>
          ))}
        </div>
      )}

      {showStudentInfo && (
        <StudentInfo
          student={selectedStudent}
          onClose={() => setShowStudentInfo(false)}
          onSave={handleStudentUpdated}
          userRole={userRole}
        />
      )}
    </div>
  );
};

export default StudentList;
