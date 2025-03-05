const express = require("express");
const { 
  registerCustomer, 
  registerEmployee, 
  loginUser, 
  resetPassword ,
  logoutUser
} = require("../controllers/authController");
const { protect, authorize } = require("../middleware/authMiddleware");

const router = express.Router();

// 用户身份验证 API
router.post("/register/customer", registerCustomer);
router.post("/register/employee", protect, authorize(["boss"]), registerEmployee); // 确保 Boss 才能注册员工
router.post("/login", loginUser);
router.put("/reset-password", resetPassword);
router.post("/logout", logoutUser); 

module.exports = router;
