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
      <div className="flex flex-col items-center">
        {/* Logo */}
        <img src={Logo} alt="Logo" className="w-10 mb-2" />
        
        {/* Zero To One text */}
        {!isCollapsed && (
          <span className="text-lg mb-4">Zero To One</span>
        )}

        {/* Menu and Logout Button */}
        <div className="flex flex-col items-center w-full">
          {/* Menu Toggle Button (hidden when sidebar is expanded) */}
          {isCollapsed && (
            <button
              onClick={toggleSidebar}
              className="flex items-center p-3 w-full rounded mb-2 hover:bg-gray-700"
            >
              <FaBars className="text-xl" />
            </button>
          )}

          {/* Navigation Menu */}
          <nav className="mt-2 flex-1 w-full">
            {menuConfig.filter(({ role: r }) => r.includes(role)).map(({ label, icon, path }) => (
              <button
                key={path}
                onClick={() => navigate(path)}
                className={`flex items-center p-3 w-full rounded mb-2 hover:bg-gray-700 ${location.pathname === path ? "bg-gray-700" : ""}`}
              >
                <span className="text-xl">{icon}</span>
                {!isCollapsed && <span className="ml-3">{label}</span>}
              </button>
            ))}
          </nav>

          {/* Logout Button */}
          <button
            onClick={handleLogout}
            className="flex items-center p-3 w-full rounded hover:bg-red-600 mt-4"
          >
            <FaSignOutAlt className="text-xl" />
            {!isCollapsed && <span className="ml-3">退出</span>}
          </button>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
