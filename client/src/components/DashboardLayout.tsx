import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from "./Sidebar";
import Navbar from "./Navbar";
import { getUserRole } from "../auth"; 

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  const navigate = useNavigate();
  const [role, setRole] = useState<string | null>(null);

  useEffect(() => {
    const userRole = getUserRole(); 
    if (!userRole) {
      navigate("/login");
    } else {
      setRole(userRole);
    }
  }, [navigate]);

  if (!role) return null;

  return (
    <div className="flex bg-gray-100">
      {/* Sidebar 默认隐藏，鼠标指向左边缘展开 */}
      <Sidebar role={role} />

      {/* 右侧内容区 */}
      <div className="flex-1 flex flex-col transition-all duration-300 ml-0">
        {/* 小屏幕显示 Navbar */}
        <div className="md:hidden w-full top-0 left-0 bg-gray-800 z-20 fixed">
          <Navbar role={role} />
        </div>

        {/* 页面内容 */}
        <div className="flex-1 p-4 mt-16 md:mt-0">
          {children}
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;
