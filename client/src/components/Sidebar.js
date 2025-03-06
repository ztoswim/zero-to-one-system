import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { FaBars, FaSignOutAlt } from "react-icons/fa";
import { getUserRole, logout } from "../auth";
import menuConfig from "./menuConfig";
import API_BASE_URL from "../api/apiConfig";
import Logo from "../assets/Logo.png";
import "../styles/Sidebar.css";

const Sidebar = ({ className }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isCollapsed, setIsCollapsed] = useState(false);
  const role = getUserRole();

  const toggleSidebar = () => setIsCollapsed(!isCollapsed);

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
    <aside className={`sidebar ${isCollapsed ? "collapsed" : ""} ${className}`}>
      <div className="sidebar-header">
        <img src={Logo} alt="Logo" className="sidebar-logo" />
        {!isCollapsed && <span className="sidebar-title">Zero To One Academy</span>}
      </div>
      <button className="sidebar-toggle" onClick={toggleSidebar}>
        <FaBars />
      </button>
      <nav className="sidebar-nav">
        <ul>
          {menuConfig
            .filter((item) => item.role.includes(role))
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
