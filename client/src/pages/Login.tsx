import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { login } from "../api/userApi";
import { FaUser, FaLock } from "react-icons/fa";
import logo from "../assets/Logo.png";

interface LoginProps {
  setUserRole: (role: string) => void;
}

const Login = ({ setUserRole }: LoginProps) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);  // 新增 loading 状态
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);  // 开始loading
    try {
      const role = await login({ username, password });
      setUserRole(role);
      navigate(`/${role}`);
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message || "登录失败");
      } else {
        setError("登录失败");
      }
    } finally {
      setLoading(false);  // 请求结束，关闭loading
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100 p-4">
      <div className="w-full max-w-md bg-white shadow-lg rounded-lg p-8 text-center">
        <img src={logo} alt="Logo" className="w-3/4 max-w-xs mx-auto mb-4 transform transition-transform duration-300 hover:scale-110" />
        {error && <p className="text-red-500 mb-3">{error}</p>}

        <form className="flex flex-col items-center" onSubmit={handleLogin}>
          <div className="flex items-center w-full max-w-xs bg-white border border-gray-300 rounded-md p-2 mb-3 focus-within:border-blue-500">
            <FaUser className="text-gray-500 mr-2" />
            <input
              type="text"
              placeholder="用户名"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              className="w-full outline-none text-base"
            />
          </div>

          <div className="flex items-center w-full max-w-xs bg-white border border-gray-300 rounded-md p-2 mb-3 focus-within:border-blue-500">
            <FaLock className="text-gray-500 mr-2" />
            <input
              type="password"
              placeholder="密码"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full outline-none text-base"
            />
          </div>

          <button
            type="submit"
            className={`w-full max-w-xs py-3 rounded-md text-base font-medium transition-colors flex items-center justify-center ${
              loading
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-blue-500 text-white hover:bg-blue-600"
            }`}
            disabled={loading}  // 登录中禁用按钮
          >
            {loading ? (
              <>
                <svg
                  className="animate-spin h-5 w-5 mr-2 text-white"
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
                登录中...
              </>
            ) : (
              "登录"
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
