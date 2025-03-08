import { useState, useEffect, useRef } from "react";
import { FaBars, FaSignOutAlt } from "react-icons/fa";
import { useNavigate, useLocation } from "react-router-dom";
import logo from "../assets/Logo.png";
import { useAuth, logout } from "../auth";
import menuConfig from "./menuConfig";

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [role] = useAuth(); // 使用自定义 Hook 获取角色
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
      setIsMenuOpen(false);
      }
    };
    if (isMenuOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isMenuOpen]);

  return (
    <nav className="flex lg:hidden items-center justify-between bg-gray-900 text-white p-4 shadow-lg relative">
      {/* Logo */}
      <div className="flex items-center">
        <img src={logo} alt="Logo" className="w-12 transition-all duration-300" />
        <span className="ml-4 text-xl font-semibold tracking-wide uppercase transition-all duration-300">
          Zero To One
        </span>
      </div>

      {/* 菜单按钮（展开后隐藏） */}
      {!isMenuOpen && (
        <button
          onClick={() => setIsMenuOpen(true)}
          className="p-2 transition-all duration-300 transform hover:scale-110 hover:bg-gray-800 rounded-md"
        >
          <FaBars className="text-white text-2xl" />
        </button>
      )}

      {/* 下拉菜单 */}
      <div
        ref={menuRef}
        className={`absolute top-14 right-4 bg-gray-900 text-white shadow-lg rounded-lg w-48 p-2 transition-all duration-300 ${
          isMenuOpen ? "opacity-100 scale-100" : "opacity-0 scale-95 pointer-events-none"
        }`}
      >
        {/* 菜单项 */}
        {menuConfig
          .filter(({ role: r }) => r.includes(role as string))
          .map(({ label, icon, path }) => (
            <button
              key={typeof path === "string" ? path : undefined}
              onClick={() => {
                if (typeof path === "string") {
                  navigate(path);
                }
                setIsMenuOpen(false);
              }}
              className={`flex items-center p-3 w-full text-left rounded-md transition-all duration-200 ease-in-out ${
                location.pathname === path ? "bg-indigo-700" : "hover:bg-indigo-600"
              }`}
            >
              <div className="text-xl">{icon}</div>
              <span className="ml-3 transition-opacity duration-300">{label}</span>
            </button>
          ))}

        {/* 退出按钮 */}
        <div className="w-full border-t border-gray-700 my-2"></div>
        <button
          onClick={handleLogout}
          className="flex items-center p-3 w-full text-left rounded-md transition-all duration-200 ease-in-out hover:bg-red-600"
        >
          <FaSignOutAlt className="text-xl" />
          <span className="ml-3 transition-opacity duration-300">退出</span>
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
