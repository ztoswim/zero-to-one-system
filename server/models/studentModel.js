const mongoose = require("mongoose");

const studentSchema = new mongoose.Schema({
  studentName: { type: String, required: true }, // 学生姓名，必须填写
  gender: { type: String, required: true, enum: ["male", "female"] }, // 性别，必须填写，枚举限制
  birthDate: { type: Date, default: null }, // 出生日期，默认为 null
  parentName: { type: String, default: "" }, // 家长姓名，可为空
  parentContact: { type: String, default: "" }, // 家长联系方式，可为空
  address: { type: String, default: "" }, // 地址，可为空
  classDuration: { type: String, default: "" }, // 课程时长，可为空
  classLocation: { type: String, default: "" }, // 课程地点，可为空
  email: { type: String, unique: true, sparse: true }, // 邮箱，可为空，若填写则唯一
}, { timestamps: true }); // 添加时间戳，自动记录创建和更新时间

const Student = mongoose.model("student_info", studentSchema);

module.exports = Student;
