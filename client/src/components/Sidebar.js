import { useState, useEffect, useRef } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { FaBars, FaSignOutAlt } from "react-icons/fa";
import { getUserRole, logout } from "../auth";
import menuConfig from "./menuConfig";
import API_BASE_URL from "../api/apiConfig";
import Logo from "../assets/Logo.png";

const Sidebar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const role = getUserRole();
  const menuRef = useRef(null);
  const [isCollapsed, setIsCollapsed] = useState(
    localStorage.getItem("sidebarCollapsed") === "true"
  );

  // Handle mouse enter to expand sidebar
  const handleMouseEnter = () => {
    setIsCollapsed(false);
  };

  // Handle mouse leave to collapse sidebar
  const handleMouseLeave = () => {
    setIsCollapsed(true);
  };

  // Logout functionality
  const handleLogout = async () => {
    await fetch(`${API_BASE_URL}/auth/logout`, { method: "POST" });
    logout();
    navigate("/login");
  };

  return (
    <aside
      ref={menuRef}
      className={`hidden lg:flex flex-col w-${isCollapsed ? "16" : "64"} bg-gray-900 text-white h-screen p-4 transition-all duration-300 ease-in-out shadow-lg hover:shadow-2xl`}
      onMouseEnter={handleMouseEnter}   // Mouse enter expands sidebar
      onMouseLeave={handleMouseLeave}   // Mouse leave collapses sidebar
    >
      {/* Logo Section */}
      <div className="flex items-center mb-8 transition-all duration-300 ease-in-out">
        <img src={Logo} alt="Logo" className="w-12 transition-all duration-300 ease-in-out" />
        {!isCollapsed && (
          <span className="ml-4 text-xl font-bold tracking-wider uppercase text-indigo-400 opacity-100 transition-all duration-300 ease-in-out">
            Zero To One
          </span>
        )}
      </div>

      {/* Divider */}
      <div className="border-t-2 border-gray-700 mb-6"></div>

      {/* Navigation Menu */}
      <nav className="flex-1">
        {menuConfig.filter(({ role: r }) => r.includes(role)).map(({ label, icon, path }) => (
          <button
            key={path}
            onClick={() => navigate(path)}
            className={`flex items-center p-3 w-full rounded-md mb-4 hover:bg-indigo-600 hover:scale-105 transition-all duration-200 ease-in-out ${location.pathname === path ? "bg-indigo-700" : ""}`}
          >
            <span className="text-xl">{icon}</span>
            {!isCollapsed && (
              <span className="ml-4 opacity-100 transition-all duration-300 ease-in-out">{label}</span>
            )}
          </button>
        ))}
      </nav>

      {/* Divider */}
      <div className="border-t-2 border-gray-700 mt-6"></div>

      {/* Logout Button */}
      <div className="mt-auto">
        <button
          onClick={handleLogout}
          className="flex items-center p-3 w-full rounded-md hover:bg-red-600 hover:scale-105 transition-all duration-200 ease-in-out"
        >
          <FaSignOutAlt className="text-xl" />
          {!isCollapsed && <span className="ml-4 opacity-100 transition-all duration-300 ease-in-out">退出</span>}
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
