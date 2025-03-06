import Sidebar from "./Sidebar";
import Navbar from "./Navbar";
import "../styles/DashboardLayout.css";

const DashboardLayout = ({ children }) => {
  return (
    <div className="dashboard-container">
      {/* 仅在大屏显示 Sidebar */}
      <Sidebar className="lg:block hidden" />

      <div className="dashboard-content">
        {/* 仅在小屏显示 Navbar */}
        <Navbar className="lg:hidden block" />

        <main className="main-content">{children}</main>
      </div>
    </div>
  );
};

export default DashboardLayout;
