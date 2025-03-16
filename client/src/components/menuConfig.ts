interface MenuItem {
  label: string;
  path: string;
}

export const menuConfig: Record<string, MenuItem[]> = {
  boss: [
    { label: "仪表盘", path: "/boss-dashboard" },
    { label: "用户管理", path: "/users" },
    { label: "学生管理", path: "/students" },
    { label: "客户管理", path: "/customers" },
    { label: "课程配套", path: "/courses" },
    { label: "银行列表", path: "/bank-list" },  // 新增银行列表
    { label: "销售发票", path: "/sale-invoices" },  // 新增销售发票
  ],
  admin: [
    { label: "仪表盘", path: "/admin-dashboard" },
    { label: "用户管理", path: "/users" },
    { label: "银行列表", path: "/bank-list" },  // 新增银行列表
    { label: "销售发票", path: "/sale-invoices" },  // 新增销售发票
  ],
  coach: [
    { label: "仪表盘", path: "/coach-dashboard" },
    { label: "学生管理", path: "/students" },
  ],
  customer: [
    { label: "仪表盘", path: "/customer-dashboard" },
  ],
};
