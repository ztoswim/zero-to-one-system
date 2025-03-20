import { useEffect, useState } from "react";
import Modal from "react-modal";
import { useForm } from "react-hook-form";
import { registerEmployee, updateUser, deleteUser } from "../api/userApi";
import { toast } from "react-toastify";

interface UserFormProps {
  isOpen: boolean;
  onClose: () => void;
  user?: any;
  refreshList: () => void;
}

const UserForm: React.FC<UserFormProps> = ({ isOpen, onClose, user, refreshList }) => {
  const { register, handleSubmit, reset } = useForm();
  const [isLoading, setIsLoading] = useState(false);

  const roles = ["boss", "admin", "coach", "customer"]; // ✅ 角色选项

  useEffect(() => {
    reset(user || { email: "", username: "", password: "", role: roles[0] });
  }, [user, reset]);

  const onSubmit = async (data: any) => {
    setIsLoading(true);
    try {
      if (user) {
        await updateUser(user._id, data);
        toast.success("用户更新成功");
      } else {
        await registerEmployee(data);
        toast.success("员工创建成功");
      }
      refreshList();
      onClose();
    } catch (error) {
      toast.error("操作失败，请重试");
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async () => {
    if (window.confirm("确定要删除此用户吗？")) {
      try {
        await deleteUser(user._id);
        toast.success("用户已删除");
        refreshList();
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
      <h2 className="text-xl font-semibold mb-4">{user ? "编辑用户" : "新建员工"}</h2>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        {/* ✅ 编辑时邮箱只能查看，允许为空 */}
        <input
          className="border p-2 w-full bg-gray-100 cursor-not-allowed"
          placeholder="邮箱"
          {...register("email")}
          disabled={!!user} // ✅ 只有编辑模式下禁用
        />

        <input className="border p-2 w-full" placeholder="用户名" {...register("username")} required />
        {!user && <input className="border p-2 w-full" type="password" placeholder="密码" {...register("password")} required />}

        {/* ✅ 角色选择框 */}
        <select className="border p-2 w-full" {...register("role")} required>
          {roles.map((role) => (
            <option key={role} value={role}>
              {role.toUpperCase()}
            </option>
          ))}
        </select>

        <div className="flex justify-between mt-4">
          <button type="button" onClick={onClose} className="p-2 bg-gray-300 rounded">取消</button>
          {user && <button type="button" onClick={handleDelete} className="p-2 bg-red-500 text-white rounded">删除</button>}
          <button type="submit" disabled={isLoading} className="p-2 bg-blue-500 text-white rounded">
            {isLoading ? "处理中..." : user ? "保存" : "新建"}
          </button>
        </div>
      </form>
    </Modal>
  );
};

export default UserForm;
