import { login } from "./api/userApi";

export const loginUser = async (username: string, password: string) => {
  try {
    // 调用后端登录 API，获取返回的 token, role, 和 biztoryAccount
    const { token, role, biztoryAccount } = await login({ username, password });

    // 将 token 和 role 存储到 localStorage
    localStorage.setItem("token", token);
    localStorage.setItem("role", role);

    // 如果有 Biztory 账户信息，存储 biztoryAccount
    if (biztoryAccount) {
      localStorage.setItem("biztoryAccount", JSON.stringify(biztoryAccount));
    }

    // 返回 role 和 biztoryAccount（如果有），用于页面跳转和展示
    return { role, biztoryAccount }; 
  } catch (error) {
    console.error("登录失败", error);
    throw error;
  }
};


export const getAuthToken = () => localStorage.getItem("token");
export const getUserRole = () => localStorage.getItem("role");
export const logoutUser = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("role");
  localStorage.removeItem("biztoryAccount");
};
