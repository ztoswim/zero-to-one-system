import { useState } from "react";
import { FaBars } from "react-icons/fa";
import SidebarNavbar from "./SidebarNavbar";
import logo from "../assets/Logo.png";

const Navbar = ({ toggleSidebar }) => {
  return (
    <nav className="lg:hidden fixed top-0 left-0 w-full bg-gray-900 text-white flex items-center justify-between p-4 z-50">
      <img src={logo} alt="Logo" className="h-8" />
      <button onClick={toggleSidebar} className="text-white text-2xl">
        <FaBars />
      </button>
    </nav>
  );
};

const DashboardLayout = ({ children }) => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);

  return (
    <div className="flex h-screen">
      {/* 仅在大屏幕显示 SidebarNavbar */}
      <div className="hidden lg:block">
        <SidebarNavbar isCollapsed={isCollapsed} setIsCollapsed={setIsCollapsed} />
      </div>
      {/* 小屏幕 Sidebar 仅在打开时显示 */}
      {isMobileSidebarOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 lg:hidden" onClick={() => setIsMobileSidebarOpen(false)}>
          <SidebarNavbar isCollapsed={false} setIsCollapsed={() => {}} />
        </div>
      )}
      <div className="flex-1 flex flex-col">
        <Navbar toggleSidebar={() => setIsMobileSidebarOpen(!isMobileSidebarOpen)} />
        <main className="flex-1 p-4 mt-[3rem] lg:mt-0">{children}</main>
      </div>
    </div>
  );
};

export default DashboardLayout;