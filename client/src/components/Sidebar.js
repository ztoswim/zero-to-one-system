import React from "react";
import { getUserRole } from "../auth";
import { FaHome, FaUsers, FaBook, FaCog, FaChalkboardTeacher, FaCalendarAlt } from "react-icons/fa";

const Sidebar = () => {
  const role = getUserRole();

  const menuItems = {
    boss: [
      { name: "首页", icon: <FaHome /> },
      { name: "员工管理", icon: <FaUsers /> },
      { name: "学生管理", icon: <FaBook /> },
      { name: "系统设置", icon: <FaCog /> },
    ],
    admin: [
      { name: "首页", icon: <FaHome /> },
      { name: "学生管理", icon: <FaBook /> },
      { name: "课程安排", icon: <FaCalendarAlt /> },
    ],
    coach: [
      { name: "首页", icon: <FaHome /> },
      { name: "我的课程", icon: <FaChalkboardTeacher /> },
    ],
    customer: [
      { name: "首页", icon: <FaHome /> },
      { name: "课程预约", icon: <FaCalendarAlt /> },
    ],
  };

  return (
    <aside style={styles.sidebar}>
      <ul style={styles.menu}>
        {menuItems[role]?.map((item, index) => (
          <li key={index} style={styles.menuItem}>
            {item.icon} <span>{item.name}</span>
          </li>
        ))}
      </ul>
    </aside>
  );
};

const styles = {
  sidebar: {
    width: "220px",
    backgroundColor: "#222",
    color: "white",
    padding: "20px",
    height: "100vh",
    boxShadow: "2px 0 5px rgba(0,0,0,0.2)",
  },
  menu: {
    listStyleType: "none",
    padding: 0,
  },
  menuItem: {
    display: "flex",
    alignItems: "center",
    padding: "12px",
    fontSize: "16px",
    cursor: "pointer",
    transition: "background 0.3s",
  },
  menuItemHover: {
    backgroundColor: "#444",
  },
};

export default Sidebar;
