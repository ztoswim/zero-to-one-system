import { FaHome, FaUsers, FaCog, FaChalkboardTeacher, FaUserTie } from "react-icons/fa";

const menuConfig = [
  { role: ["boss", "admin", "coach", "customer"], label: "首页", icon: <FaHome />, path: (role) => `/${role}` },
  { role: ["boss", "admin"], label: "用户管理", icon: <FaUsers />, path: "/users" },
  { role: ["boss", "admin", "coach"], label: "课程管理", icon: <FaChalkboardTeacher />, path: "/courses" },
  { role: ["boss"], label: "员工管理", icon: <FaUserTie />, path: "/staff" },
  { role: ["boss", "admin", "coach", "customer"], label: "设置", icon: <FaCog />, path: "/settings" },
];

export default menuConfig;