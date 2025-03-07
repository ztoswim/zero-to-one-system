import Sidebar from "./Sidebar";
import Navbar from "./Navbar";
import { ReactNode } from "react";

interface DashboardLayoutProps {
  children: ReactNode;
}

const DashboardLayout: React.FC<DashboardLayoutProps> = ({ children }) => {
  return (
    <div className="flex min-h-screen">
      {/* Sidebar 只在大屏显示 */}
      <aside className="hidden md:block">
        <Sidebar />
      </aside>

      {/* 主内容区域 */}
      <div className="flex flex-col flex-grow">
        {/* Navbar 只在小屏幕显示 */}
        <header className="block md:hidden">
          <Navbar />
        </header>

        {/* 主要内容 */}
        <main className="flex-grow p-4 overflow-auto">{children}</main>
      </div>
    </div>
  );
};

export default DashboardLayout;