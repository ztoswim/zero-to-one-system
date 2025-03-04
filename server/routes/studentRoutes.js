const express = require("express");
const Student = require("../models/studentModel");

const router = express.Router();

/** 📌 1️⃣ 获取所有学生 */
router.get("/", async (req, res) => {
  try {
    const students = await Student.find();
    res.json(students);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

/** 📌 2️⃣ 获取单个学生 */
router.get("/:id", async (req, res) => {
  try {
    const student = await Student.findById(req.params.id);
    if (!student) return res.status(404).json({ message: "Student not found" });
    res.json(student);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

/** 📌 3️⃣ 创建新学生 */
router.post("/", async (req, res) => {
  const { studentName, gender, birthDate, parentName, parentContact, address, classDuration, classLocation, email } = req.body;

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

  try {
    const savedStudent = await newStudent.save();
    res.status(201).json({ message: "Student created successfully", student: savedStudent });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

/** 📌 4️⃣ 更新学生信息 */
router.put("/:id", async (req, res) => {
  try {
    const updatedStudent = await Student.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedStudent) return res.status(404).json({ message: "Student not found" });
    res.json({ message: "Student updated successfully", student: updatedStudent });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

/** 📌 5️⃣ 删除学生 */
router.delete("/:id", async (req, res) => {
  try {
    const deletedStudent = await Student.findByIdAndDelete(req.params.id);
    if (!deletedStudent) return res.status(404).json({ message: "Student not found" });
    res.json({ message: "Student deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
