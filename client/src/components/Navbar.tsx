import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { logoutUser } from "../auth";
import { menuConfig } from "./menuConfig"; 
import { FaSignOutAlt, FaBars } from "react-icons/fa"; 
import { motion } from "framer-motion";
import { Typography } from "@mui/material";
import Logo from "../assets/Logo.png"; // 导入 Logo

const Navbar = ({ role }: { role: string }) => {
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);

  const handleLogout = () => {
    logoutUser();
    navigate("/login");
  };

  return (
    <div className="bg-gray-800 text-white px-6 py-4 flex justify-between items-center relative shadow-md">
      {/* Navbar 左侧 Logo + 文本 */}
      <div className="flex items-center space-x-3">
        <img src={Logo} alt="Logo" className="w-16 h-auto" /> {/* Logo 变小 */}
        <Typography variant="h6" className="text-white font-semibold">
          Zero To One
        </Typography>
      </div>

      {/* 移动端菜单按钮 */}
      <button onClick={() => setMenuOpen(!menuOpen)} className="md:hidden">
        <FaBars className="text-2xl" />
      </button>

      {/* 移动端菜单下拉框 */}
      {menuOpen && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          className="absolute top-14 right-4 bg-gray-700 rounded-lg shadow-lg w-48 z-50 p-2"
        >
          <ul className="space-y-2">
            {menuConfig[role]?.map((item) => {
              const Icon = item.icon;
              return (
                <li key={item.path}>
                  <button
                    onClick={() => {
                      navigate(item.path);
                      setMenuOpen(false);
                    }}
                    className="w-full text-left px-4 py-3 hover:bg-gray-600 flex items-center rounded-md transition-all"
                  >
                    <Icon className="mr-3 text-lg" />
                    {item.label}
                  </button>
                </li>
              );
            })}
            {/* 退出登录按钮 - 居中对齐 */}
            <li>
              <button
                onClick={handleLogout}
                className="w-full flex justify-center items-center gap-3 px-4 py-3 bg-red-500 hover:bg-red-600 text-white rounded-md transition-all"
              >
                <FaSignOutAlt className="text-lg" />
                退出登录
              </button>
            </li>
          </ul>
        </motion.div>
      )}
    </div>
  );
};

export default Navbar;
