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
      {!isMobile && <Sidebar />} {/* 大屏幕时显示 Sidebar */}
      <div className="flex-1 flex flex-col">
        {isMobile && <Navbar />} {/* 小屏幕时显示 Navbar */}
        <main className="p-4">{children}</main>
      </div>
    </div>
  );
};

export default DashboardLayout;
