import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { logoutUser } from "../auth";
import { menuConfig } from "./menuConfig";
import { FaSignOutAlt } from "react-icons/fa";
import { motion } from "framer-motion";
import { Typography } from "@mui/material";
import Logo from "../assets/Logo.png"; // 导入 Logo

const Sidebar = ({ role }: { role: string }) => {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false); // 控制 Sidebar 展开状态

  return (
    <div className="relative">
      {/* 触发区域：鼠标指向左侧时展开 */}
      <div
        className="fixed top-0 left-0 h-screen w-2 bg-transparent z-50"
        onMouseEnter={() => setIsOpen(true)}
      ></div>

      {/* Sidebar - Framer Motion 动画 */}
      <motion.div
        className={`fixed top-0 left-0 h-screen bg-[#0b3289] text-white shadow-xl flex flex-col p-4`}
        initial={{ x: "-100%" }}
        animate={{ x: isOpen ? "0%" : "-100%" }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
        onMouseLeave={() => setIsOpen(false)}
      >
        {/* Logo 显示 */}
        <div className="flex justify-center items-center mb-6">
          <img src={Logo} alt="Logo" className="w-36 h-auto" /> {/* Logo 加大 */}
        </div>

        {/* 菜单项 */}
        <ul className="mt-6 space-y-3">
          {menuConfig[role]?.map((item) => {
            const Icon = item.icon;
            return (
              <li key={item.path}>
                <button
                  onClick={() => navigate(item.path)}
                  className="flex items-center w-full px-4 py-3 rounded-lg transition hover:bg-[#08285b] text-white"
                >
                  <Icon className="mr-3 text-lg" />
                  <Typography variant="body1">{item.label}</Typography>
                </button>
              </li>
            );
          })}
        </ul>

        {/* 退出按钮 - 居中对齐 */}
        <div className="mt-auto">
          <button
            onClick={() => {
              logoutUser();
              navigate("/login");
            }}
            className="w-full flex justify-center items-center gap-3 px-4 py-3 rounded-lg bg-red-500 hover:bg-red-600 text-white"
          >
            <FaSignOutAlt className="text-lg" />
            <Typography variant="body1">退出</Typography>
          </button>
        </div>
      </motion.div>
    </div>
  );
};

export default Sidebar;
