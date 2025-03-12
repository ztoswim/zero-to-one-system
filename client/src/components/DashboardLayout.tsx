// src/components/DashboardLayout.tsx

import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getUserRole } from "../auth"; // 确保该函数正确返回角色信息
import Sidebar from "./Sidebar";
import Navbar from "./Navbar";

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  const navigate = useNavigate();
  const [role, setRole] = useState<string | null>(null);

  useEffect(() => {
    const userRole = getUserRole();
    if (!userRole) {
      navigate("/login"); // 没有角色信息，跳转到登录页
    } else {
      setRole(userRole);
    }
  }, [navigate]);

  if (!role) return null; // 等待角色信息加载

  return (
    <div className="flex h-screen bg-gray-100">
      {/* 大屏幕显示 Sidebar */}
      <div className="hidden md:block w-64 bg-gray-800 fixed left-0 top-0 bottom-0 z-10">
        <Sidebar role={role} />
      </div>

      <div className="flex-1 flex flex-col ml-0 md:ml-64">
        {/* 小屏幕显示 Navbar */}
        <div className="md:hidden fixed w-full top-0 left-0 bg-gray-800 z-20">
          <Navbar role={role} />
        </div>

        {/* 页面内容区域 */}
        <div className="flex-1 p-6 md:p-8 mt-16 md:mt-0">
          {children}
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;
