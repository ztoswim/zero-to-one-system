import { useEffect, useState } from "react";
import { getStudents } from "../api/studentApi"; // 导入获取学生列表的 API
import { toast } from "react-toastify";
import StudentForm from "../form/StudentForm"; // 导入表单组件

interface Student {
  _id: string;
  studentName: string;
}

const StudentPage = () => {
  const [students, setStudents] = useState<Student[]>([]);
  const [selectedStudent, setSelectedStudent] = useState<Student | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState<string>("");

  const fetchStudents = async () => {
    try {
      const data = await getStudents();
      setStudents(data);
    } catch (err) {
      toast.error("获取学生列表失败");
    }
  };

  const openStudentForm = (student: Student | null) => {
    setSelectedStudent(student);
    setIsModalOpen(true);
  };

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  const filteredStudents = students.filter((student) =>
    student.studentName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  useEffect(() => {
    fetchStudents();
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">学生管理</h1>

      {/* 搜索框 */}
      <input
        type="text"
        placeholder="搜索学生"
        value={searchTerm}
        onChange={handleSearchChange}
        className="p-2 mb-4 border border-gray-300 rounded-lg w-full"
      />

      {/* 新建学生按钮 */}
      <button
        onClick={() => openStudentForm(null)} // 打开新建学生表单
        className="mb-4 p-2 bg-green-500 text-white rounded-lg hover:bg-green-600"
      >
        新建学生
      </button>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
        {filteredStudents.map((student) => (
          <button
            key={student._id}
            onClick={() => openStudentForm(student)}
            className="p-4 bg-blue-500 text-white rounded-lg text-center hover:bg-blue-600 focus:outline-none"
          >
            {student.studentName}
          </button>
        ))}
      </div>

      {/* 学生编辑表单弹窗 */}
      <StudentForm
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        student={selectedStudent}
        refreshList={fetchStudents}
      />
    </div>
  );
};

export default StudentPage;
