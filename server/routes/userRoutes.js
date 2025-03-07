const express = require("express");
const { protect, authorize } = require("../middleware/authMiddleware");
const { getUserProfile, updateEmployee, deleteUser } = require("../controllers/userController");

const router = express.Router();

// 用户管理 API
router.get("/profile", protect, getUserProfile); // 获取用户信息
router.put("/update-employee", protect, authorize(["boss"]), updateEmployee); // Boss 编辑员工
router.delete("/:userId", protect, authorize(["boss"]), deleteUser); // Boss 删除用户

module.exports = router;
