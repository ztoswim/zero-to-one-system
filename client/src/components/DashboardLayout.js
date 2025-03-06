import SidebarNavbar from "./SidebarNavbar";
import { Outlet } from "react-router-dom";
import "../styles/DashboardLayout.css";

const DashboardLayout = () => {
  return (
    <div className="dashboard-layout">
      <SidebarNavbar />
      <main className="dashboard-content">
        <Outlet />
      </main>
    </div>
  );
};

export default DashboardLayout;
