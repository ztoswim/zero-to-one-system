import { ReactNode } from "react";
import { Home, Users, Settings, GraduationCap, Briefcase } from "lucide-react";

// 定义菜单项的类型
interface MenuItem {
  role: string[];
  label: string;
  icon: ReactNode;
  path: string | ((role: string) => string);
}

const menuConfig: MenuItem[] = [
  { role: ["boss", "admin", "coach", "customer"], label: "首页", icon: <Home size={20} />, path: (role) => `/${role}` },
  { role: ["boss", "admin"], label: "用户管理", icon: <Users size={20} />, path: "/users" },
  { role: ["boss", "admin", "coach"], label: "课程管理", icon: <GraduationCap size={20} />, path: "/courses" },
  { role: ["boss"], label: "员工管理", icon: <Briefcase size={20} />, path: "/staff" },
  { role: ["boss", "admin", "coach", "customer"], label: "设置", icon: <Settings size={20} />, path: "/settings" },
];

export default menuConfig;
