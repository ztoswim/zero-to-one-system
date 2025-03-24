import { useEffect, useState } from "react";
import Modal from "react-modal";
import { useForm } from "react-hook-form";
import { registerCustomer, registerEmployee, updateUser, deleteUser, forgotPassword } from "../api/userApi";
import { toast } from "react-toastify";

// ✅ 解决 react-modal 警告
Modal.setAppElement("#root");

interface UserFormProps {
  isOpen: boolean;
  onClose: () => void;
  user?: any; // 如果 user 存在，则是编辑模式
  isRegister?: boolean; // ✅ true 表示 "注册 customer"
  isForgotPassword?: boolean; // ✅ true 表示 "忘记密码"
  refreshList?: () => void;
}

const UserForm: React.FC<UserFormProps> = ({ isOpen, onClose, user, isRegister, isForgotPassword, refreshList }) => {
  const { register, handleSubmit, reset } = useForm();
  const [isLoading, setIsLoading] = useState(false);

  const roles = ["boss", "admin", "coach", "customer"]; // 角色选项

  useEffect(() => {
    if (isRegister) {
      reset({ email: "", username: "", password: "", confirmPassword: "" });
    } else if (isForgotPassword) {
      reset({ email: "", username: "", password: "", confirmPassword: "" });
    } else if (user) {
      reset({ email: user.email, username: user.username, role: user.role });
    } else {
      reset({ email: "", username: "", password: "", role: roles[0] });
    }
  }, [user, isRegister, isForgotPassword, reset]);

  const onSubmit = async (data: any) => {
    setIsLoading(true);
    try {
      if (isRegister) {
        // ✅ 处理注册 customer
        if (data.password !== data.confirmPassword) {
          toast.error("密码和确认密码不匹配");
          return;
        }
        await registerCustomer(data);
        toast.success("注册成功");
      } else if (isForgotPassword) {
        // ✅ 处理忘记密码
        if (data.password !== data.confirmPassword) {
          toast.error("密码和确认密码不匹配");
          return;
        }
        await forgotPassword(data);
        toast.success("密码已重置，请重新登录");
      } else if (user) {
        // ✅ 处理更新用户信息
        await updateUser(user._id, data);
        toast.success("用户信息更新成功");
      } else {
        // ✅ 处理新建用户
        await registerEmployee(data);
        toast.success("员工创建成功");
      }

      refreshList && refreshList();
      onClose();
    } catch (error: any) {
      toast.error(error.message || "操作失败，请重试");
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async () => {
    if (window.confirm("确定要删除此用户吗？")) {
      try {
        await deleteUser(user._id);
        toast.success("用户已删除");
        refreshList && refreshList();
        onClose();
      } catch (error) {
        toast.error("删除失败");
      }
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      className="bg-white p-6 rounded-lg shadow-lg w-[400px] mx-auto relative"
      overlayClassName="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center"
    >
      <h2 className="text-xl font-semibold mb-4">
        {isRegister ? "注册新用户" : isForgotPassword ? "忘记密码" : user ? "编辑用户" : "新建用户"}
      </h2>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        {/* ✅ 邮箱输入框 */}
        <input
          className={`border p-2 w-full ${user ? "bg-gray-100" : ""}`}
          placeholder="邮箱"
          {...register("email")}
          disabled={!!user} // ✅ 只有编辑用户时禁用
        />

        {/* ✅ 用户名 */}
        <input className="border p-2 w-full" placeholder="用户名" {...register("username", { required: true })} />

        {/* ✅ 注册 customer 和 忘记密码（需要密码 & 确认密码） */}
        {(isRegister || isForgotPassword) && (
          <>
            <input
              type="password"
              className="border p-2 w-full"
              placeholder="密码"
              {...register("password", { required: true, minLength: 6 })}
            />
            <input
              type="password"
              className="border p-2 w-full"
              placeholder="确认密码"
              {...register("confirmPassword", { required: true })}
            />
          </>
        )}

        {/* ✅ 新建用户模式（需要密码 & 角色选择） */}
        {!user && !isRegister && !isForgotPassword && (
          <>
            <input
              type="password"
              className="border p-2 w-full"
              placeholder="密码"
              {...register("password", { required: true, minLength: 6 })}
            />
            <select className="border p-2 w-full" {...register("role")} required>
              {roles.map((role) => (
                <option key={role} value={role}>
                  {role.toUpperCase()}
                </option>
              ))}
            </select>
          </>
        )}

        {/* ✅ 编辑用户模式（只允许修改用户名 & 角色） */}
        {user && (
          <select className="border p-2 w-full" {...register("role")} required>
            {roles.map((role) => (
              <option key={role} value={role}>
                {role.toUpperCase()}
              </option>
            ))}
          </select>
        )}

        <div className="flex justify-between mt-4">
          <button type="button" onClick={onClose} className="p-2 bg-gray-300 rounded">取消</button>
          {user && <button type="button" onClick={handleDelete} className="p-2 bg-red-500 text-white rounded">删除</button>}
          <button type="submit" disabled={isLoading} className="p-2 bg-blue-500 text-white rounded">
            {isLoading ? "处理中..." : isRegister ? "注册" : isForgotPassword ? "重置密码" : user ? "保存" : "新建"}
          </button>
        </div>
      </form>
    </Modal>
  );
};

export default UserForm;
