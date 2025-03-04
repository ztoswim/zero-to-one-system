const mongoose = require("mongoose");

const studentSchema = new mongoose.Schema({
  studentName: { type: String, required: true }, // 学生姓名，必须填写
  gender: { type: String, required: true }, // 性别，必须填写
  birthDate: { type: Date, required: true }, // 出生日期，必须填写
  parentName: { type: String, default: "" }, // 家长姓名，可为空
  parentContact: { type: String, default: "" }, // 家长联系方式，可为空
  address: { type: String, default: "" }, // 地址，可为空
  classDuration: { type: String, default: "" }, // 课程时长，可为空
  classLocation: { type: String, default: "" }, // 课程地点，可为空
  email: { type: String, required: false }, // 邮箱，可为空，可重复
});

const Student = mongoose.model("student_info", studentSchema);

module.exports = Student;
