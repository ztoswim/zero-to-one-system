const express = require("express");
const { protect, authorize } = require("../middleware/authMiddleware");
const {
  createStudent,
  getStudents,
  getStudentById,
  updateStudent,
  deleteStudent,
} = require("../controllers/studentController");

const router = express.Router();

router.post("/", protect, authorize(["boss", "admin"]), createStudent); // 创建学生
router.get("/", protect, getStudents); // 获取所有学生
router.get("/:studentId", protect, getStudentById); // 获取单个学生
router.put("/:studentId", protect, authorize(["boss", "admin"]), updateStudent); // 更新学生
router.delete("/:studentId", protect, authorize(["boss"]), deleteStudent); // 删除学生

module.exports = router;
