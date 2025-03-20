import { FaTachometerAlt, FaUsers, FaUserGraduate, FaClipboardList, FaBook, FaUniversity, FaFileInvoice } from 'react-icons/fa';

interface MenuItem {
  label: string;
  path: string;
  icon: React.ElementType; // 这里改成组件类型，而不是 JSX.Element
}

export const menuConfig: Record<string, MenuItem[]> = {
  boss: [
    { label: "仪表盘", path: "/boss-dashboard", icon: FaTachometerAlt },
    { label: "用户管理", path: "/user-management", icon: FaUsers },
    { label: "学生管理", path: "/students", icon: FaUserGraduate },
    { label: "客户管理", path: "/customers", icon: FaClipboardList },
    { label: "课程配套", path: "/courses", icon: FaBook },
    { label: "银行列表", path: "/bank-list", icon: FaUniversity },  // 新增银行列表
    { label: "销售发票", path: "/sale-invoices", icon: FaFileInvoice },  // 新增销售发票
  ],
  admin: [
    { label: "仪表盘", path: "/admin-dashboard", icon: FaTachometerAlt },
    { label: "银行列表", path: "/bank-list", icon: FaUniversity },  // 新增银行列表
    { label: "销售发票", path: "/sale-invoices", icon: FaFileInvoice },  // 新增销售发票
  ],
  coach: [
    { label: "仪表盘", path: "/coach-dashboard", icon: FaTachometerAlt },
    { label: "学生管理", path: "/students", icon: FaUserGraduate },
  ],
  customer: [
    { label: "仪表盘", path: "/customer-dashboard", icon: FaTachometerAlt },
  ],
};
