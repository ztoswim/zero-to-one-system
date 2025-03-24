import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../auth"; // ✅ 这里不需要引入 forgotPassword
import { FiUser, FiLock } from "react-icons/fi";
import { toast } from "react-toastify";
import { motion } from "framer-motion";
import Logo from "../assets/Logo.png"; // 引入 Logo
import UserForm from "../form/UserForm"; // ✅ 引入 UserForm 作为弹窗

const Login = ({ setRole }: { setRole: (role: string | null) => void }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [isRegisterOpen, setIsRegisterOpen] = useState(false);
  const [isForgotPasswordOpen, setIsForgotPasswordOpen] = useState(false); // ✅ 控制忘记密码弹窗

  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const { role, biztoryAccount } = await loginUser(username, password);
      toast.success("登录成功 🎉");

      localStorage.setItem("role", role);
      setRole(role);

      if (biztoryAccount) {
        localStorage.setItem("biztoryAccount", JSON.stringify(biztoryAccount));
        toast.success("Biztory 登录成功！");
      }

      navigate(`/${role}-dashboard`);
    } catch (error) {
      toast.error("登录失败，请检查用户名或密码！");
      console.error("登录失败", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center w-screen h-screen bg-gradient-to-br from-blue-100 to-blue-300">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="bg-white shadow-lg rounded-xl p-8 w-96"
      >
        <div className="flex justify-center mb-8">
          <img src={Logo} alt="Logo" className="w-64 h-auto" />
        </div>

        <form onSubmit={handleLogin} className="flex flex-col gap-5">
          <div className="relative">
            <FiUser className="absolute left-3 top-3.5 text-gray-500" />
            <input
              type="text"
              placeholder="用户名"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full border border-gray-300 p-3 pl-10 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
            />
          </div>
          <div className="relative">
            <FiLock className="absolute left-3 top-3.5 text-gray-500" />
            <input
              type="password"
              placeholder="密码"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full border border-gray-300 p-3 pl-10 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
            />
          </div>

          {/* 登录按钮 */}
          <button
            type="submit"
            className={`w-full max-w-xs py-3 rounded-md text-base font-medium transition-colors flex items-center justify-center ${
              loading ? "bg-gray-400 cursor-not-allowed" : "bg-blue-500 text-white hover:bg-blue-600"
            }`}
            disabled={loading}
          >
            {loading ? "登录中..." : "登录"}
          </button>

          {/* 按钮组 */}
          <div className="flex justify-between mt-2">
            <button
              type="button"
              onClick={() => setIsRegisterOpen(true)}
              className="text-blue-500 hover:underline"
            >
              注册新用户
            </button>
            <button
              type="button"
              onClick={() => setIsForgotPasswordOpen(true)} // ✅ 打开忘记密码弹窗
              className="text-red-500 hover:underline"
            >
              忘记密码？
            </button>
          </div>
        </form>
      </motion.div>

      {/* 注册弹窗 */}
      <UserForm
        isOpen={isRegisterOpen}
        onClose={() => setIsRegisterOpen(false)}
        isRegister={true}
        refreshList={() => {}}
      />

      {/* 忘记密码弹窗 */}
      <UserForm
        isOpen={isForgotPasswordOpen}
        onClose={() => setIsForgotPasswordOpen(false)}
        isForgotPassword={true} // ✅ 传递 isForgotPassword
      />
    </div>
  );
};

export default Login;
