// src/config/menuConfig.js
import { FaHome, FaUsers, FaCog, FaChalkboardTeacher, FaUserTie } from "react-icons/fa";

const menuItems = [
  { roles: ["boss", "admin", "coach", "customer"], label: "首页", icon: FaHome, path: "/" },
  { roles: ["boss", "admin"], label: "用户管理", icon: FaUsers, path: "/users" },
  { roles: ["boss", "admin", "coach"], label: "课程管理", icon: FaChalkboardTeacher, path: "/courses" },
  { roles: ["boss"], label: "员工管理", icon: FaUserTie, path: "/staff" },
  { roles: ["boss", "admin", "coach", "customer"], label: "设置", icon: FaCog, path: "/settings" },
];

export default menuItems;
