import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { FaSignOutAlt, FaBars } from "react-icons/fa";
import { getUserRole, logout } from "../auth";
import menuItems from "./menuConfig";
import "../styles/Sidebar.css";

const Sidebar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isCollapsed, setIsCollapsed] = useState(localStorage.getItem("sidebarCollapsed") === "true");
  const [role, setRole] = useState(getUserRole());

  useEffect(() => {
    localStorage.setItem("sidebarCollapsed", isCollapsed);
  }, [isCollapsed]);

  return (
    <aside className={`sidebar ${isCollapsed ? "collapsed" : ""}`}>
      <button className="toggle-button" onClick={() => setIsCollapsed(!isCollapsed)}>
        <FaBars />
      </button>
      <nav className="sidebar-nav">
        <ul>
          {menuItems
            .filter(item => item.roles.includes(role))
            .map(({ label, icon: Icon, path }) => (
              <li key={path} className={location.pathname === path ? "active" : ""}>
                <button className="sidebar-button" onClick={() => navigate(path)}>
                  <Icon className="sidebar-icon" />
                  {!isCollapsed && <span className="sidebar-label">{label}</span>}
                </button>
              </li>
            ))}
        </ul>
      </nav>
      <button className="sidebar-logout" onClick={() => { logout(); navigate("/login"); }}>
        <FaSignOutAlt className="sidebar-icon" />
        {!isCollapsed && <span className="sidebar-label">退出</span>}
      </button>
    </aside>
  );
};

export default Sidebar;
