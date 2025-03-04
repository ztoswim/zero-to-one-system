const express = require("express");
const { protect, authorize } = require("../middleware/authMiddleware");
const {
  registerCustomer,
  registerEmployee,
  loginUser,
  getUserProfile,
  resetPassword,
  updateEmployee,
  deleteUser,
} = require("../controllers/userController");

const router = express.Router();

router.post("/register/customer", registerCustomer); // 顾客注册
router.post("/register/employee", protect, authorize(["boss"]), registerEmployee); // Boss 注册员工
router.post("/login", loginUser); // 登录
router.get("/profile", protect, getUserProfile); // 获取用户信息
router.put("/reset-password", resetPassword); // 顾客修改密码
router.put("/update-employee", protect, authorize(["boss"]), updateEmployee); // Boss 编辑员工
router.delete("/:userId", protect, authorize(["boss"]), deleteUser); // Boss 删除用户

module.exports = router;
