import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaBars, FaHome, FaUsers, FaCog, FaChalkboardTeacher, FaUserTie, FaSignOutAlt } from "react-icons/fa";
import { getUserRole, logout } from "../auth";
import "../styles/Navbar.css";

const Navbar = () => {
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const role = getUserRole();

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
    <header className="navbar">
      <button className="menu-button" onClick={() => setIsMenuOpen(!isMenuOpen)}>
        <FaBars />
      </button>

      {isMenuOpen && (
        <nav className="navbar-menu">
          <ul>
            {menuItems.map(({ label, icon: Icon, path }) => (
              <li key={path}>
                <button className="navbar-item" onClick={() => navigate(path)}>
                  <Icon className="navbar-icon" />
                  <span>{label}</span>
                </button>
              </li>
            ))}
          </ul>
          <button className="navbar-logout" onClick={handleLogout}>
            <FaSignOutAlt className="navbar-icon" />
            <span>退出</span>
          </button>
        </nav>
      )}
    </header>
  );
};

export default Navbar;
