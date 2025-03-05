const express = require("express");
const { 
  registerCustomer, 
  registerEmployee, 
  loginUser, 
  resetPassword 
} = require("../controllers/authController");
const { protect, authorize } = require("../middleware/authMiddleware");

const router = express.Router();

// 用户身份验证 API
router.post("/register/customer", registerCustomer);
router.post("/register/employee", protect, authorize(["boss"]), registerEmployee); // 确保 Boss 才能注册员工
router.post("/login", loginUser);
router.put("/reset-password", resetPassword);

// ✅ Logout API（只是返回消息，前端仍需清除 Token）
router.post("/logout", (req, res) => {
  res.json({ message: "Logged out successfully" });
});

module.exports = router;
