import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FaBars, FaHome, FaUsers, FaCog, FaChalkboardTeacher, FaUserTie, FaSignOutAlt } from "react-icons/fa";
import API_BASE_URL from "../api/apiConfig";
import "../styles/Sidebar.css";

const Sidebar = () => {
  const navigate = useNavigate();
  const role = localStorage.getItem("role");

  // 读取 Sidebar 展开/折叠状态
  const [isCollapsed, setIsCollapsed] = useState(
    localStorage.getItem("sidebarCollapsed") === "true"
  );

  // 切换 Sidebar 展开/折叠
  const toggleSidebar = () => {
    const newState = !isCollapsed;
    setIsCollapsed(newState);
    localStorage.setItem("sidebarCollapsed", newState);
  };

  const handleLogout = async () => {
    try {
      await fetch(`${API_BASE_URL}/auth/logout`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
      });

      localStorage.removeItem("token");
      localStorage.removeItem("role");

      navigate("/login");
    } catch (error) {
      console.error("Logout failed", error);
    }
  };

  // 菜单项
  const menuItems = [
    { role: ["boss", "admin", "coach", "customer"], label: "首页", icon: <FaHome />, path: `/${role}` },
    { role: ["boss", "admin"], label: "用户管理", icon: <FaUsers />, path: "/users" },
    { role: ["boss", "admin", "coach"], label: "课程管理", icon: <FaChalkboardTeacher />, path: "/courses" },
    { role: ["boss"], label: "员工管理", icon: <FaUserTie />, path: "/staff" },
    { role: ["boss", "admin", "coach", "customer"], label: "设置", icon: <FaCog />, path: "/settings" },
  ];

  return (
    <aside className={`sidebar ${isCollapsed ? "collapsed" : ""}`}>
      <button className="sidebar-toggle" onClick={toggleSidebar}>
        <FaBars />
      </button>
      <nav className="sidebar-nav">
        <ul>
          {menuItems.map(({ role: allowedRoles, label, icon, path }) =>
            allowedRoles.includes(role) ? (
              <li key={path}>
                <button className="sidebar-button" onClick={() => navigate(path)}>
                  <span className="sidebar-icon">{icon}</span>
                  {!isCollapsed && <span className="sidebar-label">{label}</span>}
                </button>
              </li>
            ) : null
          )}
        </ul>
      </nav>
      <button className="sidebar-logout" onClick={handleLogout}>
        <FaSignOutAlt className="sidebar-icon" />
        {!isCollapsed && <span className="sidebar-label">退出</span>}
      </button>
    </aside>
  );
};

export default Sidebar;
