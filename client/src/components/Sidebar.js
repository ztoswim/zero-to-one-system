import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { FaHome, FaUsers, FaCog, FaChalkboardTeacher, FaUserTie, FaSignOutAlt } from "react-icons/fa";
import { getUserRole, logout } from "../auth";
import "../styles/Sidebar.css";

const Sidebar = ({ isCollapsed }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [role, setRole] = useState(getUserRole());

  useEffect(() => {
    const handleStorageChange = () => setRole(getUserRole());
    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, []);

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const menuItems = [
    { roles: ["boss", "admin", "coach", "customer"], label: "首页", icon: FaHome, path: `/${role}` },
    { roles: ["boss", "admin"], label: "用户管理", icon: FaUsers, path: "/users" },
    { roles: ["boss", "admin", "coach"], label: "课程管理", icon: FaChalkboardTeacher, path: "/courses" },
    { roles: ["boss"], label: "员工管理", icon: FaUserTie, path: "/staff" },
    { roles: ["boss", "admin", "coach", "customer"], label: "设置", icon: FaCog, path: "/settings" },
  ].filter(item => item.roles.includes(role));

  return (
    <aside className={`sidebar ${isCollapsed ? "collapsed" : ""}`}>
      <nav className="sidebar-nav">
        <ul>
          {menuItems.map(({ label, icon: Icon, path }) => (
            <li key={path}>
              <button
                className={`sidebar-button ${location.pathname === path ? "active" : ""}`}
                onClick={() => navigate(path)}
              >
                <Icon className="sidebar-icon" />
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
