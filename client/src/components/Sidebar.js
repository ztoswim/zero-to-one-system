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
      <div className="flex flex-col items-start">
        {/* Logo */}
        <div className="flex items-center mb-2">
          <img src={Logo} alt="Logo" className="w-10" />
          {/* Zero To One text in uppercase and to the right of logo */}
          {!isCollapsed && (
            <span className="ml-2 text-lg font-semibold tracking-wider uppercase">Zero To One</span>
          )}
        </div>

        {/* Divider Line (always visible) */}
        <div className="border-t-2 border-gray-700 my-2 w-full"></div> {/* Made the divider thicker */}

        {/* Menu and Logout Button */}
        <div className="flex flex-col items-start w-full">
          {/* Menu Toggle Button (hidden when sidebar is expanded) */}
          <button
            onClick={toggleSidebar}
            className={`flex items-center p-3 w-full rounded mb-2 hover:bg-gray-700 ${isCollapsed ? "mt-2" : "mt-4"}`}
          >
            <FaBars className="text-xl" />
          </button>

          {/* Divider Line between menu button and navigation */}
          {isCollapsed && (
            <div className="border-t-2 border-gray-700 w-full mb-2"></div>  /* Thicker divider */
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

          {/* Divider Line between menu and logout */}
          <div className="border-t-2 border-gray-700 my-2 w-full"></div> {/* Thicker divider */}

          {/* Logout Button (placed at the bottom) */}
          <div className="mt-auto">
            <button
              onClick={handleLogout}
              className="flex items-center p-3 w-full rounded hover:bg-red-600 mt-4"
            >
              <FaSignOutAlt className="text-xl" />
              {!isCollapsed && <span className="ml-3">退出</span>}
            </button>
          </div>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
