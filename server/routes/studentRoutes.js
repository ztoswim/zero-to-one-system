const express = require("express");
const Student = require("../models/studentModel");

const router = express.Router();

/** 🔹 统一错误处理函数 */
const handleError = (res, error, message = "服务器错误", status = 500) => {
  console.error(message, error);
  return res.status(status).json({ message });
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
    const { studentName, gender, birthDate, parentName, parentContact, address, classDuration, classLocation, email } = req.body;

    if (!studentName || !parentContact) {
      return res.status(400).json({ message: "学生姓名和家长联系方式必填" });
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
      email
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
    const updatedStudent = await Student.findByIdAndUpdate(req.params.id, req.body, { new: true });

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
