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
    { label: "发票管理", path: "/invoices" }, // 添加发票管理页面
    { label: "买家管理", path: "/buyers" }, // 添加买家管理页面
    { label: "商品管理", path: "/products" }, // 添加商品管理页面
  ],
  admin: [
    { label: "仪表盘", path: "/admin-dashboard" },
    { label: "用户管理", path: "/users" },
    { label: "发票管理", path: "/invoices" }, // 添加发票管理页面
    { label: "买家管理", path: "/buyers" }, // 添加买家管理页面
  ],
  coach: [
    { label: "仪表盘", path: "/coach-dashboard" },
    { label: "学生管理", path: "/students" },
  ],
  customer: [
    { label: "仪表盘", path: "/customer-dashboard" },
  ],
};
