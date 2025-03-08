import { useEffect, useState } from "react";
import { getStudents } from "../api/studentApi";

const Students = () => {
  const [students, setStudents] = useState<any[]>([]);

  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const data = await getStudents();
        setStudents(data);
      } catch (error) {
        console.error("获取学生失败", error);
      }
    };

    fetchStudents();
  }, []);

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold mb-4">学生列表</h1>
      <table className="w-full border">
        <thead>
          <tr className="bg-gray-200">
            <th className="border p-2">姓名</th>
            <th className="border p-2">性别</th>
            <th className="border p-2">出生日期</th>
            <th className="border p-2">家长联系方式</th>
          </tr>
        </thead>
        <tbody>
          {students.map((student) => (
            <tr key={student._id} className="border text-center">
              <td className="border p-2">{student.studentName}</td>
              <td className="border p-2">{student.gender}</td>
              <td className="border p-2">{student.birthDate}</td>
              <td className="border p-2">{student.parentContact}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Students;
