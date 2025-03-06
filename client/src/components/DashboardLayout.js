import { useState } from "react";
import SidebarNavbar from "./SidebarNavbar";
import logo from "../assets/Logo.png";

const Navbar = () => {
  return (
    <nav className="lg:hidden fixed top-0 left-0 w-full bg-gray-900 text-white flex items-center justify-between p-4 z-50">
      <div className="flex items-center gap-2">
        <img src={logo} alt="Logo" className="h-8" />
        <span className="text-lg font-semibold">Zero To One Academy</span>
      </div>
    </nav>
  );
};

const DashboardLayout = ({ children }) => {
  return (
    <div className="flex h-screen">
      {/* 仅大屏显示 Sidebar */}
      <div className="hidden lg:block">
        <SidebarNavbar />
      </div>

      <div className="flex-1 flex flex-col">
        {/* 仅小屏显示 Navbar */}
        <Navbar />
        <main className="flex-1 p-4 mt-[3rem] lg:mt-0">{children}</main>
      </div>
    </div>
  );
};

export default DashboardLayout;
