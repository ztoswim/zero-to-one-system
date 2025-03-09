import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../auth";
import { FiUser, FiLock } from "react-icons/fi";
import { toast } from "react-toastify";
import { motion } from "framer-motion";
import Logo from "../assets/Logo.png"; // ✅ 引入 Logo

const Login = ({ setRole }: { setRole: (role: string | null) => void }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false); // 用于控制加载状态
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!username || !password) {
      toast.error("用户名和密码不能为空！");
      return;
    }

    setLoading(true); // 开始加载
    try {
      const role = await loginUser(username, password);
      toast.success("登录成功 🎉");

      localStorage.setItem("role", role);
      setRole(role);
      navigate(`/${role}-dashboard`);
    } catch (error: any) {
      toast.error(error?.response?.data?.message || "登录失败，请检查用户名或密码！");
      console.error("登录失败", error);
    } finally {
      setLoading(false); // 结束加载
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
        {/* 放大 Logo */}
        <div className="flex justify-center mb-8">
          <img src={Logo} alt="Logo" className="w-64 h-auto" /> {/* 放大到 256px 宽度 */}
        </div>

        <form onSubmit={handleLogin} className="flex flex-col gap-5">
          {/* 用户名输入框 */}
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

          {/* 密码输入框 */}
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
              loading
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-blue-500 text-white hover:bg-blue-600"
            }`}
            disabled={loading} // 登录中禁用按钮
          >
            {loading ? (
              <>
                登录中...
                <svg
                  className="animate-spin h-5 w-5 ml-2 text-white" // 动画在文本后面
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8v4l3.5-3.5L12 0v4a8 8 0 01-8 8z"
                  ></path>
                </svg>
              </>
            ) : (
              "登录"
            )}
          </button>
        </form>
      </motion.div>
    </div>
  );
};

export default Login;
