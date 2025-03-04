import React, { useState, useEffect } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { format } from "date-fns";
import "../styles/StudentInfo.css";
import { addStudent, updateStudent, deleteStudent } from "../api/studentApi";

const StudentInfo = ({ student, onClose, onSave, userRole }) => {
  const [formData, setFormData] = useState({
    studentName: "",
    gender: "",
    birthDate: "",
    parentName: "",
    parentContact: "",
    address: "",
    email: "",
    classDuration: "",
    classLocation: "",
  });

  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (student && student.id) {
      setFormData({
        studentName: student.studentName || "",
        gender: student.gender || "",
        birthDate: student.birthDate ? new Date(student.birthDate) : null,
        parentName: student.parentName || "",
        parentContact: student.parentContact || "",
        address: student.address || "",
        email: student.email || "",
        classDuration: student.classDuration || "",
        classLocation: student.classLocation || "",
      });
    }
  }, [student]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    let newValue = value;

    // 自动大写
    if (["studentName", "parentName", "address", "classLocation"].includes(name)) {
      newValue = value.toUpperCase();
    }

    // 只允许输入数字
    if (name === "parentContact") {
      newValue = value.replace(/\D/g, "");
    }

    setFormData({ ...formData, [name]: newValue });
    setErrors({ ...errors, [name]: "" });
  };

  const validateForm = () => {
    let newErrors = {};
    if (!formData.studentName.trim()) newErrors.studentName = "学生姓名不能为空";
    if (!formData.gender) newErrors.gender = "请选择性别";
    if (!formData.birthDate) newErrors.birthDate = "请选择出生日期";
    if (!formData.parentContact.trim()) newErrors.parentContact = "联系方式不能为空";
    if (!formData.email.trim()) {
      newErrors.email = "邮箱不能为空";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "请输入有效的邮箱地址";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    const formattedDate = format(new Date(formData.birthDate), "yyyy-MM-dd");
    const studentData = { ...formData, birthDate: formattedDate };

    try {
      if (student) {
        await updateStudent(student.id, studentData);
      } else {
        await addStudent(studentData);
      }
      onSave();
    } catch (error) {
      setErrors({ ...errors, formError: error.message || "提交失败" });
    }
  };

  const handleDelete = async () => {
    if (!student || !window.confirm("确定要删除该学生吗？")) return;
    try {
      await deleteStudent(student.id);
      onSave();
      onClose();
    } catch (error) {
      setErrors({ ...errors, formError: error.message || "删除失败" });
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <button className="close-x" onClick={onClose}>×</button>
        <h2>{student ? "编辑学生信息" : "新建学生"}</h2>
        <form onSubmit={handleSubmit} className="form-container">
          <label>学生姓名</label>
          <input
            type="text"
            name="studentName"
            value={formData.studentName}
            onChange={handleChange}
            className={errors.studentName ? "input-error" : ""}
          />
          {errors.studentName && <span className="error-message">{errors.studentName}</span>}

          <label>性别</label>
          <div className="gender-selection">
            {["male", "female"].map((gender) => (
              <button
                key={gender}
                type="button"
                className={`gender-btn ${formData.gender === gender ? "selected" : ""} ${
                  errors.gender ? "input-error" : ""
                }`}
                onClick={() => {
                  setFormData({ ...formData, gender });
                  setErrors({ ...errors, gender: "" });
                }}
              >
                {gender === "male" ? "男" : "女"}
              </button>
            ))}
          </div>
          {errors.gender && <span className="error-message">{errors.gender}</span>}

          <label>出生日期</label>
          <DatePicker
            selected={formData.birthDate}
            onChange={(date) => {
              setFormData({ ...formData, birthDate: date });
              setErrors({ ...errors, birthDate: "" });
            }}
            dateFormat="dd-MM-yyyy"
            showYearDropdown
            showMonthDropdown
            maxDate={new Date()}
            placeholderText="选择出生日期"
            className={errors.birthDate ? "input-error" : ""}
          />
          {errors.birthDate && <span className="error-message">{errors.birthDate}</span>}

          <label>家长姓名</label>
          <input type="text" name="parentName" value={formData.parentName} onChange={handleChange} />

          <label>联系方式</label>
          <input
            type="text"
            name="parentContact"
            value={formData.parentContact}
            onChange={handleChange}
            className={errors.parentContact ? "input-error" : ""}
          />
          {errors.parentContact && <span className="error-message">{errors.parentContact}</span>}

          <label>地址</label>
          <input type="text" name="address" value={formData.address} onChange={handleChange} />

          <label>邮箱</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className={errors.email ? "input-error" : ""}
          />
          {errors.email && <span className="error-message">{errors.email}</span>}

          <label>上课时长</label>
          <div className="duration-selection">
            {["30MINS", "40MINS", "50MINS"].map((duration) => (
              <button
                key={duration}
                type="button"
                className={`duration-btn ${formData.classDuration === duration ? "selected" : ""}`}
                onClick={() => setFormData({ ...formData, classDuration: duration })}
              >
                {duration}
              </button>
            ))}
          </div>

          <label>上课地点</label>
          <input type="text" name="classLocation" value={formData.classLocation} onChange={handleChange} />

          {errors.formError && <p className="error-message">{errors.formError}</p>}

          <div className="button-group">
            <button type="submit">{student ? "保存" : "创建"}</button>
            {student && userRole === "boss" && (
              <button type="button" className="delete-btn" onClick={handleDelete}>删除</button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};

export default StudentInfo;
