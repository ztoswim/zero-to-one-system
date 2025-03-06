import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { FaBars, FaSignOutAlt } from "react-icons/fa";
import { getUserRole, logout } from "../auth";
import menuConfig from "./menuConfig";
import API_BASE_URL from "../api/apiConfig";
import Logo from "../assets/Logo.png";
import "../styles/Sidebar.css"; // 引入 CSS

const Sidebar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const role = getUserRole();

  const [isCollapsed, setIsCollapsed] = useState(
    localStorage.getItem("sidebarCollapsed") === "true"
  );

  const toggleSidebar = () => {
    setIsCollapsed(!isCollapsed);
    localStorage.setItem("sidebarCollapsed", !isCollapsed);
  };

  const handleLogout = async () => {
    await fetch(`${API_BASE_URL}/auth/logout`, { method: "POST" });
    logout();
    navigate("/login");
  };

  return (
    <aside className={`sidebar ${isCollapsed ? "collapsed" : ""}`}>
      <div className="sidebar-header">
        <img src={Logo} alt="Logo" className="sidebar-logo" />
        {!isCollapsed && <span className="sidebar-title">Zero To One</span>}
        <button className="sidebar-toggle" onClick={toggleSidebar}>
          <FaBars />
        </button>
      </div>

      <nav className="sidebar-nav">
        <ul>
          {menuConfig
            .filter(({ role: r }) => r.includes(role))
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

      <button className="sidebar-logout" onClick={handleLogout}>
        <FaSignOutAlt className="sidebar-icon" />
        {!isCollapsed && <span className="sidebar-label">退出</span>}
      </button>
    </aside>
  );
};

export default Sidebar;
