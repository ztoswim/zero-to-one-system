import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { logout, getUserRole } from "../auth";
import { 
  FaBars, FaHome, FaUserCog, FaUsers, 
  FaChalkboardTeacher, FaBook, FaSignOutAlt 
} from "react-icons/fa";

const Sidebar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const role = getUserRole();
  const [activePath, setActivePath] = useState(location.pathname);
  const [isCollapsed, setIsCollapsed] = useState(false);

  const menus = {
    boss: [
      { name: "首页", path: "/boss", icon: <FaHome /> },
      { name: "管理员工", path: "/boss/employees", icon: <FaUserCog /> },
      { name: "管理学生", path: "/boss/students", icon: <FaUsers /> },
    ],
    admin: [
      { name: "首页", path: "/admin", icon: <FaHome /> },
      { name: "管理学生", path: "/admin/students", icon: <FaUsers /> },
    ],
    coach: [
      { name: "首页", path: "/coach", icon: <FaHome /> },
      { name: "课程管理", path: "/coach/classes", icon: <FaChalkboardTeacher /> },
    ],
    customer: [
      { name: "首页", path: "/customer", icon: <FaHome /> },
      { name: "我的课程", path: "/customer/classes", icon: <FaBook /> },
    ],
  };

  const handleNavigate = (path) => {
    setActivePath(path);
    navigate(path);
  };

  return (
    <div style={{ 
      ...styles.sidebar, 
      width: isCollapsed ? "60px" : "250px",
      boxShadow: isCollapsed ? "2px 0 5px rgba(0,0,0,0.2)" : "4px 0 10px rgba(0,0,0,0.3)"
    }}>
      <div style={styles.topSection}>
        <button onClick={() => setIsCollapsed(!isCollapsed)} style={styles.toggleButton}>
          <FaBars />
        </button>
      </div>

      <ul style={styles.menu}>
        {menus[role]?.map((item) => (
          <li
            key={item.path}
            style={{
              ...styles.menuItem,
              background: activePath === item.path ? "#444" : "transparent",
              borderRadius: isCollapsed ? "50%" : "8px"
            }}
            onClick={() => handleNavigate(item.path)}
          >
            <span style={styles.icon}>{item.icon}</span>
            {!isCollapsed && <span>{item.name}</span>}
          </li>
        ))}
      </ul>

      <button onClick={logout} style={styles.logout}>
        <FaSignOutAlt style={{ marginRight: isCollapsed ? "0px" : "8px" }} />
        {!isCollapsed && "登出"}
      </button>
    </div>
  );
};

const styles = {
  sidebar: {
    height: "100vh",
    background: "#222",
    color: "#fff",
    display: "flex",
    flexDirection: "column",
    padding: "20px",
    transition: "width 0.3s ease, box-shadow 0.3s ease",
    borderRadius: "10px 0 0 10px",
  },
  topSection: {
    display: "flex",
    justifyContent: "flex-end",
    marginBottom: "20px",
  },
  toggleButton: {
    background: "none",
    border: "none",
    color: "white",
    fontSize: "20px",
    cursor: "pointer",
  },
  menu: {
    listStyle: "none",
    padding: 0,
    flexGrow: 1,
  },
  menuItem: {
    padding: "12px",
    cursor: "pointer",
    marginBottom: "8px",
    transition: "background 0.3s, border-radius 0.3s",
    display: "flex",
    alignItems: "center",
    gap: "10px",
  },
  icon: {
    fontSize: "18px",
  },
  logout: {
    padding: "12px",
    background: "#e74c3c",
    border: "none",
    color: "white",
    cursor: "pointer",
    borderRadius: "8px",
    marginTop: "20px",
    display: "flex",
    alignItems: "center",
    transition: "margin-right 0.3s",
  },
};

export default Sidebar;
