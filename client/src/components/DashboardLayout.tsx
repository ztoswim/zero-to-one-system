import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getUserRole } from "../auth";
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
    <div className="flex h-screen">
      {/* 大屏幕显示 Sidebar */}
      <div className="hidden md:block w-64 bg-gray-800">
        <Sidebar role={role} />
      </div>
      
      <div className="flex-1 flex flex-col">
        {/* 小屏幕显示 Navbar */}
        <div className="md:hidden">
          <Navbar role={role} />
        </div>
        
        {/* 页面内容区域 */}
        <div className="flex-1 p-4">{children}</div>
      </div>
    </div>
  );
};

export default DashboardLayout;
