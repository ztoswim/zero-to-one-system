// Sidebar.js
import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { FaSignOutAlt } from "react-icons/fa";
import { getUserRole, logout } from "../auth";
import API_BASE_URL from "../api/apiConfig";
import menuConfig from "../menuConfig";
import "../styles/Sidebar.css";

const Sidebar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [role, setRole] = useState(getUserRole());
  const [isCollapsed, setIsCollapsed] = useState(false);

  // 监听 localStorage 变化，动态更新角色
  useEffect(() => {
    const handleStorageChange = () => {
      setRole(getUserRole());
    };
    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, []);

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
    <aside className={`sidebar ${isCollapsed ? "collapsed" : ""}`}>
      <nav className="sidebar-nav">
        <ul>
          {menuConfig.map(({ role: allowedRoles, label, icon, path }) =>
            allowedRoles.includes(role) ? (
              <li key={label}>
                <button
                  className={`sidebar-button ${location.pathname === (typeof path === 'function' ? path(role) : path) ? "active" : ""}`}
                  onClick={() => navigate(typeof path === 'function' ? path(role) : path)}
                >
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
