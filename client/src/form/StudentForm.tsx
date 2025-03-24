import { useEffect, useState } from "react";
import Modal from "react-modal";
import { useForm } from "react-hook-form";
import { createStudent, updateStudent, deleteStudent } from "../api/studentApi";
import { toast } from "react-toastify";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css"; // 引入日期选择器样式

Modal.setAppElement("#root");

interface Props {
  isOpen: boolean;
  onClose: () => void;
  student: any;
  refreshList: () => void;
}

const StudentForm = ({ isOpen, onClose, student, refreshList }: Props) => {
  const { register, handleSubmit, reset, setValue } = useForm();
  const [loading, setLoading] = useState(false);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);

  // 性别选项
  const genderOptions = [
    { value: "male", label: "男" },
    { value: "female", label: "女" },
  ];

  useEffect(() => {
    reset(
      student || {
        studentName: "",
        gender: "male", // 默认是 male
        birthDate: "",
        parentName: "",
        parentContact: "",
        address: "",
        classDuration: "30MINS", // 默认时长为 30MINS
        classLocation: "",
        email: "",
      }
    );
    if (student && student.birthDate) {
      setSelectedDate(new Date(student.birthDate)); // 设置日期
    }
  }, [student, reset]);

  // 将输入转换为大写
  const handleUpperCase = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.target.value = e.target.value.toUpperCase();
  };

  const onSubmit = async (data: any) => {
    setLoading(true);
    try {
      // 打印提交的数据，调试性别字段
      console.log("提交的数据：", data);

      // 确保性别值是 male 或 female
      const gender = data.gender === "男" ? "male" : "female"; // 转换性别

      // 格式化生日为 MongoDB 的标准日期格式 (YYYY-MM-DD)
      const birthDate = selectedDate ? selectedDate.toISOString().split("T")[0] : null;

      const studentData = {
        ...data,
        gender, // 保存转换后的性别
        birthDate,
        studentName: data.studentName.toUpperCase(),
        parentName: data.parentName.toUpperCase(),
        address: data.address.toUpperCase(),
      };

      if (student) {
        await updateStudent(student._id, studentData);
        toast.success("学生信息更新成功");
      } else {
        await createStudent(studentData);
        toast.success("学生创建成功");
      }

      refreshList();
      onClose();
    } catch {
      toast.error("操作失败");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    const confirmDelete = confirm("确定要删除该学生吗？");
    if (!confirmDelete) return;

    try {
      await deleteStudent(student._id);
      toast.success("学生已删除");
      refreshList();
      onClose();
    } catch (error) {
      toast.error("删除失败");
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      className="bg-white p-6 rounded-lg shadow-lg w-[600px] mx-auto"
      overlayClassName="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center"
    >
      <h2 className="text-2xl font-semibold mb-4">{student ? "编辑学生" : "添加学生"}</h2>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {/* 基本信息 */}
        <section>
          <h3 className="text-xl font-semibold mb-4">基本信息</h3>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold">学生姓名</label>
              <input
                className="w-full border p-3 mt-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="学生姓名"
                {...register("studentName", { required: true })}
                onChange={handleUpperCase}
              />
            </div>

            {/* 性别选择 */}
            <div>
              <label className="block text-sm font-semibold">性别</label>
              <select
                className="w-full border p-3 mt-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                {...register("gender", { required: true })}
              >
                {genderOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>

            {/* 生日 */}
            <div>
              <label className="block text-sm font-semibold">生日</label>
              <DatePicker
                selected={selectedDate}
                onChange={(date: Date | null) => {
                  setSelectedDate(date);
                  setValue("birthDate", date); // 更新表单字段，允许 null
                }}
                dateFormat="dd/MM/yyyy"
                className="w-full border p-3 mt-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholderText="选择生日日期"
              />
            </div>
          </div>
        </section>

        {/* 联系方式 */}
        <section>
          <h3 className="text-xl font-semibold mb-4">联系方式</h3>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold">家长姓名</label>
              <input
                className="w-full border p-3 mt-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="家长姓名"
                {...register("parentName")}
                onChange={handleUpperCase}
              />
            </div>

            <div>
              <label className="block text-sm font-semibold">家长联系电话</label>
              <input
                className="w-full border p-3 mt-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="家长联系电话"
                {...register("parentContact", { required: true, pattern: /^[0-9]*$/ })}
              />
            </div>

            <div>
              <label className="block text-sm font-semibold">地址</label>
              <input
                className="w-full border p-3 mt-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="地址"
                {...register("address")}
                onChange={handleUpperCase}
              />
            </div>

            <div>
              <label className="block text-sm font-semibold">邮箱</label>
              <input
                className="w-full border p-3 mt-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="邮箱"
                {...register("email", { pattern: /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/ })}
              />
            </div>
          </div>
        </section>

        {/* 课程信息 */}
        <section>
          <h3 className="text-xl font-semibold mb-4">课程信息</h3>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold">时长</label>
              <select
                className="w-full border p-3 mt-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                {...register("classDuration", { required: true })}
              >
                <option value="30MINS">30MINS</option>
                <option value="40MINS">40MINS</option>
                <option value="50MINS">50MINS</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-semibold">地点</label>
              <input
                className="w-full border p-3 mt-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="地点"
                {...register("classLocation")}
              />
            </div>
          </div>
        </section>

        {/* 操作按钮 */}
        <div className="flex justify-between mt-6">
          {student && (
            <button
              type="button"
              onClick={handleDelete}
              className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600"
            >
              删除
            </button>
          )}
          <button
            type="submit"
            disabled={loading}
            className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
          >
            {loading ? "处理中..." : student ? "保存" : "添加"}
          </button>
        </div>
      </form>
    </Modal>
  );
};

export default StudentForm;
