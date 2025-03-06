import { useState, useRef } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { FaSignOutAlt } from "react-icons/fa";
import { getUserRole, logout } from "../auth";
import menuConfig from "./menuConfig";
import API_BASE_URL from "../api/apiConfig";
import Logo from "../assets/Logo.png";

const Sidebar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const role = getUserRole();
  const menuRef = useRef(null);

  const [isCollapsed, setIsCollapsed] = useState(true); // 默认收起

  const handleMouseEnter = () => setIsCollapsed(false);
  const handleMouseLeave = () => setIsCollapsed(true);

  const handleLogout = async () => {
    await fetch(`${API_BASE_URL}/auth/logout`, { method: "POST" });
    logout();
    navigate("/login");
  };

  return (
    <aside
      ref={menuRef}
      className={`hidden lg:flex flex-col transition-all duration-300 ease-in-out h-screen bg-gray-900 text-white shadow-lg ${
        isCollapsed ? "w-16" : "w-64"
      }`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {/* 顶部 Logo + ZERO TO ONE */}
      <div className="flex flex-col justify-center items-center h-32 flex-shrink-0">
        <div className="flex items-center">
          {/* Logo */}
          <img
            src={Logo}
            alt="Logo"
            className={`transition-all duration-300 ${
              isCollapsed ? "w-10 h-10" : "w-14 h-14"
            } object-contain`}
          />
          {/* ZERO TO ONE 竖排文字 */}
          {!isCollapsed && (
            <div className="ml-3 text-indigo-400 font-bold text-lg leading-tight flex flex-col items-center text-center">
              <span className="tracking-wider">ZERO</span>
              <span className="tracking-wider mt-1">TO</span>
              <span className="tracking-wider mt-1">ONE</span>
            </div>
          )}
        </div>
      </div>

      {/* 分割线 */}
      <div className="w-full border-t border-gray-700 my-4"></div>

      {/* 导航菜单 */}
      <nav className="flex-1 space-y-2">
        {menuConfig
          .filter(({ role: r }) => r.includes(role))
          .map(({ label, icon, path }) => (
            <button
              key={path}
              onClick={() => navigate(path)}
              className={`flex items-center w-full rounded-md py-3 transition-all duration-200 ease-in-out ${
                location.pathname === path
                  ? "bg-indigo-700"
                  : "hover:bg-indigo-600"
              }`}
            >
              <div className="flex items-center justify-center w-12 h-12 text-xl">
                {icon}
              </div>
              {!isCollapsed && (
                <span className="text-base whitespace-nowrap">{label}</span>
              )}
            </button>
          ))}
      </nav>

      {/* 底部退出按钮 */}
      <div className="mt-auto">
        <div className="w-full border-t border-gray-700 my-4"></div>
        <button
          onClick={handleLogout}
          className="flex items-center w-full rounded-md py-3 transition-all duration-200 ease-in-out hover:bg-red-600"
        >
          <div className="flex items-center justify-center w-12 h-12 text-xl">
            <FaSignOutAlt />
          </div>
          {!isCollapsed && <span className="text-base">退出</span>}
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;