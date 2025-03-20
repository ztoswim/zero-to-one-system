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
    <div className="flex bg-gray-100 min-h-screen">
      {/* 只在大屏幕显示 Sidebar */}
      <div className="hidden md:flex">
        <Sidebar role={role} />
      </div>

      {/* 右侧内容区 */}
      <div className="flex-1 flex flex-col">
        {/* 小屏幕显示 Navbar，但不遮挡内容 */}
        <div className="md:hidden w-full bg-gray-800 z-20 sticky top-0">
          <Navbar role={role} />
        </div>

        {/* 页面内容，顶部留出空间以避免 Navbar 遮挡 */}
        <div className="flex-1 p-4 pt-16 md:pt-4">
          {children}
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;
