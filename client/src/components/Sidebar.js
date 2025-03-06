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
      className={`hidden lg:flex flex-col transition-all duration-300 ease-in-out h-screen p-4 bg-gray-900 text-white shadow-lg ${
        isCollapsed ? "w-16" : "w-64"
      }`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {/* 顶部 + 中间内容（Logo+文字） + 菜单项 + 底部退出按钮 */}
      <div className="flex flex-col h-full justify-between">
        {/* 顶部Logo区域 - 居中控制 */}
        <div className="flex flex-col items-center">
          <img
            src={Logo}
            alt="Logo"
            className={`transition-all duration-300 ease-in-out ${
              isCollapsed ? "w-10 h-10" : "w-32 h-auto"
            } object-contain`}
          />
          {!isCollapsed && (
            <div className="mt-2 flex flex-col items-center text-xl font-bold tracking-wider uppercase text-indigo-400 leading-tight text-center">
              <span>ZERO</span>
              <span>TO</span>
              <span>ONE</span>
            </div>
          )}
        </div>

        {/* 中间分割线和菜单项 */}
        <div className="flex-1 mt-4">
          <div className="border-t-2 border-gray-700 my-4"></div>

          {/* 菜单项 */}
          <nav className="space-y-2">
            {menuConfig
              .filter(({ role: r }) => r.includes(role))
              .map(({ label, icon, path }) => (
                <button
                  key={path}
                  onClick={() => navigate(path)}
                  className={`flex items-center w-full rounded-md py-3 transition-all duration-200 ease-in-out ${
                    location.pathname === path ? "bg-indigo-700" : "hover:bg-indigo-600"
                  }`}
                >
                  {/* 图标容器 - 居中+统一大小 */}
                  <div className="flex items-center justify-center w-12 h-12 text-xl">
                    {icon}
                  </div>

                  {/* 文字（仅展开时显示） */}
                  {!isCollapsed && (
                    <span className="text-base whitespace-nowrap">{label}</span>
                  )}
                </button>
              ))}
          </nav>
        </div>

        {/* 底部分割线和退出按钮 */}
        <div className="mt-auto">
          <div className="border-t-2 border-gray-700 mb-4"></div>
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
