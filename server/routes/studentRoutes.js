const express = require("express");
const Student = require("../models/studentModel");

const router = express.Router();

/** 🔹 统一错误处理函数 */
const handleError = (res, error, message = "服务器错误", status = 500) => {
  console.error(message, error);
  return res.status(status).json({ message });
};

/** 📌 校验学生信息 */
const validateStudentData = (data) => {
  let errors = {};

  if (!data.studentName || data.studentName.trim() === "") {
    errors.studentName = "学生姓名不能为空";
  }
  if (!data.parentContact || data.parentContact.trim() === "") {
    errors.parentContact = "家长联系方式不能为空";
  }
  if (data.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
    errors.email = "无效的邮箱地址";
  }

  return errors;
};

/** 📌 1️⃣ 获取所有学生 */
router.get("/", async (req, res) => {
  try {
    const students = await Student.find();
    res.json(students);
  } catch (err) {
    handleError(res, err, "获取学生列表失败");
  }
});

/** 📌 2️⃣ 获取单个学生 */
router.get("/:id", async (req, res) => {
  try {
    const student = await Student.findById(req.params.id);
    if (!student) return res.status(404).json({ message: "未找到该学生" });
    res.json(student);
  } catch (err) {
    handleError(res, err, "获取学生失败");
  }
});

/** 📌 3️⃣ 创建新学生 */
router.post("/", async (req, res) => {
  try {
    let { studentName, gender, birthDate, parentName, parentContact, address, classDuration, classLocation, email } = req.body;

    // 去除空格，避免意外的输入错误
    studentName = studentName?.trim();
    parentContact = parentContact?.trim();
    email = email?.trim();

    // 统一数据校验
    const errors = validateStudentData({ studentName, parentContact, email });
    if (Object.keys(errors).length > 0) {
      return res.status(400).json({ message: "数据校验失败", errors });
    }

    const newStudent = new Student({
      studentName,
      gender,
      birthDate,
      parentName,
      parentContact,
      address,
      classDuration,
      classLocation,
      email,
    });

    const savedStudent = await newStudent.save();
    res.status(201).json({ message: "学生创建成功", student: savedStudent });
  } catch (err) {
    handleError(res, err, "创建学生失败", 400);
  }
});

/** 📌 4️⃣ 更新学生信息 */
router.put("/:id", async (req, res) => {
  try {
    let { studentName, gender, birthDate, parentName, parentContact, address, classDuration, classLocation, email } = req.body;

    // 去除空格
    studentName = studentName?.trim();
    parentContact = parentContact?.trim();
    email = email?.trim();

    // 校验数据
    const errors = validateStudentData({ studentName, parentContact, email });
    if (Object.keys(errors).length > 0) {
      return res.status(400).json({ message: "数据校验失败", errors });
    }

    const updatedStudent = await Student.findByIdAndUpdate(
      req.params.id,
      { studentName, gender, birthDate, parentName, parentContact, address, classDuration, classLocation, email },
      { new: true, runValidators: true }
    );

    if (!updatedStudent) return res.status(404).json({ message: "未找到该学生" });

    res.json({ message: "学生信息更新成功", student: updatedStudent });
  } catch (err) {
    handleError(res, err, "更新学生信息失败", 400);
  }
});

/** 📌 5️⃣ 删除学生 */
router.delete("/:id", async (req, res) => {
  try {
    const deletedStudent = await Student.findByIdAndDelete(req.params.id);
    if (!deletedStudent) return res.status(404).json({ message: "未找到该学生" });

    res.json({ message: "学生已删除" });
  } catch (err) {
    handleError(res, err, "删除学生失败");
  }
});

module.exports = router;
