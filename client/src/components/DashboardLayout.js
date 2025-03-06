import Sidebar from "./Sidebar";
import Navbar from "./Navbar";
import "../styles/DashboardLayout.css";

const DashboardLayout = ({ children }) => {
  return (
    <div className="dashboard-container">
      <Sidebar />
      <div className="dashboard-content">
        <Navbar />
        <main className="main-content">{children}</main>
      </div>
    </div>
  );
};

export default DashboardLayout;
