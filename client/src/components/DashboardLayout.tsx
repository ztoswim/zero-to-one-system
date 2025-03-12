import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from "./Sidebar";
import Navbar from "./Navbar";
import { getUserRole } from "../auth"; // 获取当前用户角色

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  const navigate = useNavigate();
  const [role, setRole] = useState<string | null>(null);

  useEffect(() => {
    const userRole = getUserRole(); // 获取当前用户角色
    if (!userRole) {
      navigate("/login"); // 如果没有角色信息，跳转到登录页面
    } else {
      setRole(userRole); // 设置角色
    }
  }, [navigate]);

  if (!role) return null; // 等待角色信息加载

  return (
    <div className="flex h-screen bg-gray-100">
      {/* 大屏幕显示 Sidebar */}
      <div className="hidden md:block w-64 bg-gray-800 text-white p-4">
        <Sidebar role={role} />
      </div>

      {/* 内容区域 */}
      <div className="flex-1 flex flex-col ml-0">
        {/* 小屏幕显示 Navbar */}
        <div className="md:hidden w-full top-0 left-0 bg-gray-800 z-20">
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
