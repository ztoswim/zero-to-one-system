import Sidebar from "./Sidebar";
import Navbar from "./Navbar";

const DashboardLayout = ({ children }) => {
  return (
    <div className="flex min-h-screen">
      {/* Sidebar 只在大屏显示 */}
      <div className="hidden md:block">
        <Sidebar />
      </div>

      {/* 主内容区域 */}
      <div className="flex flex-col flex-grow">
        {/* Navbar 只在小屏幕显示 */}
        <div className="block md:hidden">
          <Navbar />
        </div>

        {/* 主要内容 */}
        <main className="flex-grow p-4 overflow-auto">{children}</main>
      </div>
    </div>
  );
};

export default DashboardLayout;
