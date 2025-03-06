import { useState, useEffect } from "react";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";

const DashboardLayout = ({ children }) => {
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div className="flex min-h-screen">
      {isMobile ? <Navbar /> : <Sidebar />} {/* 小屏显示 Navbar，大屏显示 Sidebar */}
      <div className="flex-1 flex flex-col">
        <main className="p-4">{children}</main>
      </div>
    </div>
  );
};

export default DashboardLayout;
