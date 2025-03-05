const express = require("express");
const { registerCustomer, registerEmployee, loginUser, resetPassword } = require("../controllers/userController");
const { protect } = require("../middleware/authMiddleware");

const router = express.Router();

// 用户身份验证 API
router.post("/register/customer", registerCustomer);
router.post("/register/employee", protect, registerEmployee);
router.post("/login", loginUser);
router.put("/reset-password", resetPassword);

// ✅ Logout API（前端删除 Token）
router.post("/logout", (req, res) => {
  res.json({ message: "Logged out successfully" });
});

module.exports = router;
