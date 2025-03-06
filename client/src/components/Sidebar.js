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
      {/* Sidebar内容整体上下分布 */}
      <div className="flex flex-col h-full justify-between">
        {/* 顶部 Logo + ZERO TO ONE（展开时） */}
        <div className="flex flex-col items-center">
          <div className="flex items-center mt-4">
            <img
              src={Logo}
              alt="Logo"
              className={`transition-all duration-300 ease-in-out ${
                isCollapsed ? "w-10 h-10" : "w-16 h-16"
              } object-contain`}
            />
            {!isCollapsed && (
              <div className="flex flex-col items-center ml-3 text-lg font-bold tracking-wider uppercase text-indigo-400">
                <span>Z</span>
                <span>E</span>
                <span>R</span>
                <span>O</span>
                <span className="mt-1">T</span>
                <span>O</span>
                <span className="mt-1">O</span>
                <span>N</span>
                <span>E</span>
              </div>
            )}
          </div>

          <div className="w-full border-t-2 border-gray-700 my-4"></div>
        </div>

        {/* 中间菜单 */}
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
                {/* 图标 - 固定宽高居中 */}
                <div className="flex items-center justify-center w-12 h-12 text-xl">
                  {icon}
                </div>
                {!isCollapsed && (
                  <span className="text-base whitespace-nowrap">
                    {label}
                  </span>
                )}
              </button>
            ))}
        </nav>

        {/* 底部分割线 + 退出按钮 */}
        <div className="mt-auto">
          <div className="w-full border-t-2 border-gray-700 mb-4"></div>
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
      </div>
    </aside>
  );
};

export default Sidebar;
