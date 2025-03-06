import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { FaBars, FaTimes, FaSignOutAlt } from "react-icons/fa";
import { getUserRole, logout } from "../auth";
import menuConfig from "./menuConfig";
import API_BASE_URL from "../api/apiConfig";
import "../styles/SidebarNavbar.css";

const SidebarNavbar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isCollapsed, setIsCollapsed] = useState(false);
  const role = getUserRole(); // 获取当前角色

  const toggleSidebar = () => {
    setIsCollapsed(!isCollapsed);
  };

  const handleLogout = async () => {
    try {
      await fetch(`${API_BASE_URL}/auth/logout`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
      });

      logout();
      navigate("/login");
    } catch (error) {
      console.error("Logout failed", error);
    }
  };

  return (
    <div className="sidebar-navbar-container">
      {/* Navbar */}
      <nav className="navbar">
        <div className="navbar-left">
          <span className="navbar-title">Zero To One Academy</span>
        </div>
        <div className="navbar-right">
          <button className="mobile-menu-button" onClick={toggleSidebar}>
            {isCollapsed ? <FaBars /> : <FaTimes />}
          </button>
        </div>
      </nav>

      {/* Sidebar (仅大屏显示) */}
      <aside className={`sidebar ${isCollapsed ? "collapsed" : ""}`}>
        <button className="sidebar-toggle" onClick={toggleSidebar}>
          {isCollapsed ? <FaBars /> : <FaTimes />}
        </button>

        <nav className="sidebar-nav">
          <ul>
            {menuConfig
              .filter((item) => item.role.includes(role)) // 过滤菜单
              .map(({ label, icon, path }) => (
                <li key={path}>
                  <button
                    className={`sidebar-button ${location.pathname === path ? "active" : ""}`}
                    onClick={() => navigate(path)}
                  >
                    <span className="sidebar-icon">{icon}</span>
                    {!isCollapsed && <span className="sidebar-label">{label}</span>}
                  </button>
                </li>
              ))}
          </ul>
        </nav>

        {/* 退出按钮 */}
        <button className="sidebar-logout" onClick={handleLogout}>
          <FaSignOutAlt className="sidebar-icon" />
          {!isCollapsed && <span className="sidebar-label">退出</span>}
        </button>
      </aside>
    </div>
  );
};

export default SidebarNavbar;
