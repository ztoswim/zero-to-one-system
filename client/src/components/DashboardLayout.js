import { useState } from "react";
import { FaBars } from "react-icons/fa";
import Sidebar from "./Sidebar";
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

  return (
    <div className="flex h-screen">
      <Sidebar isCollapsed={isCollapsed} setIsCollapsed={setIsCollapsed} />
      <div className="flex-1 flex flex-col">
        <Navbar toggleSidebar={() => setIsCollapsed(!isCollapsed)} />
        <main className="flex-1 p-4 mt-[3rem] lg:mt-0">{children}</main>
      </div>
    </div>
  );
};

export default DashboardLayout;