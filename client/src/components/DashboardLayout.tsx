import { ReactNode } from "react";
import Sidebar from "./Sidebar";
import Navbar from "./Navbar";

interface DashboardLayoutProps {
  children: ReactNode;
}

const DashboardLayout = ({ children }: DashboardLayoutProps) => {
  return (
    <div className="flex h-screen">
      {/* 大屏显示 Sidebar */}
      <div className="hidden md:block w-64">
        <Sidebar />
      </div>

      {/* 内容区域 */}
      <div className="flex-1 flex flex-col">
        {/* 小屏显示 Navbar */}
        <div className="md:hidden">
          <Navbar />
        </div>

        {/* Dashboard 主要内容 */}
        <main className="p-4">{children}</main>
      </div>
    </div>
  );
};

export default DashboardLayout;
