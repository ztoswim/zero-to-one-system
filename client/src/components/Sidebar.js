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

  // Toggle sidebar collapse
  const toggleSidebar = () => {
    setIsCollapsed(!isCollapsed);
    localStorage.setItem("sidebarCollapsed", !isCollapsed);
  };

  // Close sidebar when clicking outside of it
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setIsCollapsed(true);  // Automatically collapse sidebar when clicking outside
      }
    };

    if (!isCollapsed) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isCollapsed]);

  // Logout functionality
  const handleLogout = async () => {
    await fetch(`${API_BASE_URL}/auth/logout`, { method: "POST" });
    logout();
    navigate("/login");
  };

  return (
    <aside
      ref={menuRef}
      className={`hidden lg:flex flex-col w-${isCollapsed ? "16" : "64"} bg-gray-900 text-white h-screen p-4`}
    >
      {/* Logo Section */}
      <div className="flex items-center mb-6">
        <img src={Logo} alt="Logo" className="w-10" />
        {!isCollapsed && (
          <span className="ml-4 text-lg font-semibold tracking-wider uppercase">Zero To One</span>
        )}
      </div>

      {/* Divider */}
      <div className="border-t-2 border-gray-700 mb-4"></div>

      {/* Menu Toggle Button (Only visible when sidebar is collapsed) */}
      {isCollapsed && (
        <div className="flex justify-center mb-6">
          <button
            onClick={toggleSidebar}
            className="flex items-center p-3 w-full rounded hover:bg-gray-700"
          >
            <FaBars className="text-xl" />
          </button>
        </div>
      )}

      {/* Navigation Menu */}
      <nav className="flex-1">
        {menuConfig.filter(({ role: r }) => r.includes(role)).map(({ label, icon, path }) => (
          <button
            key={path}
            onClick={() => navigate(path)}
            className={`flex items-center p-3 w-full rounded mb-4 hover:bg-gray-700 ${location.pathname === path ? "bg-gray-700" : ""}`}
          >
            <span className="text-xl">{icon}</span>
            {!isCollapsed && <span className="ml-4">{label}</span>}
          </button>
        ))}
      </nav>

      {/* Divider */}
      <div className="border-t-2 border-gray-700 mt-6"></div>

      {/* Logout Button */}
      <div className="mt-auto">
        <button
          onClick={handleLogout}
          className="flex items-center p-3 w-full rounded hover:bg-red-600"
        >
          <FaSignOutAlt className="text-xl" />
          {!isCollapsed && <span className="ml-4">退出</span>}
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;