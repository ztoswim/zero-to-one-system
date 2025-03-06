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
      {/* 顶部 Logo */}
      <div className={`flex items-center justify-center transition-all duration-300 ${isCollapsed ? "h-16" : "h-36"} flex-shrink-0`}>
        <div className={`flex justify-center items-center transition-all duration-300 ${isCollapsed ? "w-16 h-16" : "w-36 h-36"}`}>
          <img
            src={Logo}
            alt="Logo"
            className={`transition-all duration-300 ${
              isCollapsed ? "w-12 h-12" : "w-40 h-40"
            } object-contain`}
          />
        </div>
      </div>

      {/* 分割线 */}
      <div className={`w-full border-t border-gray-700 transition-all duration-300 ${isCollapsed ? "mt-1" : "my-1.5"}`}></div>

      {/* 导航菜单 */}
      <nav className="flex-1 space-y-1.5 px-2">
        {menuConfig
          .filter(({ role: r }) => r.includes(role))
          .map(({ label, icon, path }) => (
            <button
              key={path}
              onClick={() => navigate(path)}
              className={`flex items-center w-full rounded-md py-2 px-4 transition-all duration-200 ease-in-out ${
                location.pathname === path
                  ? "bg-indigo-700"  // 选中时样式
                  : "hover:bg-indigo-600"
              }`}
            >
              <div className={`flex items-center justify-center ${isCollapsed ? "w-16" : "w-14 -ml-4"} h-10 text-xl`}>
                {icon}
              </div>
              <span
                className={`text-base whitespace-nowrap transition-opacity duration-300 ${
                  isCollapsed ? "opacity-0 invisible" : "opacity-100 visible"
                } -ml-1`}
              >
                {label}
              </span>
            </button>
          ))}
      </nav>

      {/* 底部退出按钮 */}
      <div className="mt-auto px-2">
        <div className="w-full border-t border-gray-700 my-1.5"></div>
        <button
          onClick={handleLogout}
          className="flex items-center w-full rounded-md py-2 px-4 transition-all duration-200 ease-in-out hover:bg-red-600"
        >
          <div className={`flex items-center justify-center ${isCollapsed ? "w-16" : "w-14 -ml-4"} h-10 text-xl`}>
            <FaSignOutAlt />
          </div>
          <span
            className={`text-base transition-opacity duration-300 ${
              isCollapsed ? "opacity-0 invisible" : "opacity-100 visible"
            }`}
          >
            退出
          </span>
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
