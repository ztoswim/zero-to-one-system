const Student = require("../models/Student");

// 创建学生（仅 boss 和 admin 可创建）
const createStudent = async (req, res) => {
  const { studentName, gender, birthDate, parentName, parentContact, address, classDuration, classLocation, email } = req.body;

  const student = new Student({
    studentName,
    gender,
    birthDate,
    parentName: parentName || null,
    parentContact,
    address: address || null,
    classDuration: classDuration || null,
    classLocation: classLocation || null,
    email: email || null,
  });

  await student.save();
  res.status(201).json({ message: "学生创建成功", student });
};

// 获取所有学生
const getStudents = async (req, res) => {
  const students = await Student.find();
  res.json(students);
};

// 获取单个学生
const getStudentById = async (req, res) => {
  const student = await Student.findById(req.params.studentId);
  if (!student) {
    return res.status(404).json({ message: "学生不存在" });
  }
  res.json(student);
};

// 更新学生（仅 boss 和 admin 可更新）
const updateStudent = async (req, res) => {
  const { studentId } = req.params;
  const updates = req.body;

  const student = await Student.findByIdAndUpdate(studentId, updates, { new: true });
  if (!student) {
    return res.status(404).json({ message: "学生不存在" });
  }
  res.json({ message: "学生信息已更新", student });
};

// 删除学生（仅 boss 可删除）
const deleteStudent = async (req, res) => {
  const { studentId } = req.params;

  const student = await Student.findById(studentId);
  if (!student) {
    return res.status(404).json({ message: "学生不存在" });
  }

  await student.remove();
  res.json({ message: "学生已删除" });
};

module.exports = {
  createStudent,
  getStudents,
  getStudentById,
  updateStudent,
  deleteStudent,
};
