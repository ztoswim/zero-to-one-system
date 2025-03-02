const express = require("express");
const connection = require("../db"); // 数据库连接
const router = express.Router();

// 🚨 校验必填字段（家长姓名、地址、上课时长、上课地点可为空）
const validateStudentData = (req, res, next) => {
  const { studentName, gender, birthDate, parentContact } = req.body;
  
  if (!studentName) return res.status(400).json({ message: "学生姓名不能为空" });
  if (!gender) return res.status(400).json({ message: "性别不能为空" });
  if (!birthDate) return res.status(400).json({ message: "出生日期不能为空" });
  if (!parentContact) return res.status(400).json({ message: "联系方式不能为空" });

  next(); // 继续执行下一个中间件
};


// 获取所有学生
router.get("/", (req, res) => {
  connection.query("SELECT * FROM student_info", (err, results) => {
    if (err) return res.status(500).json({ message: "数据库查询失败" });
    res.json(results);
  });
});

// 添加新学生
router.post("/", validateStudentData, (req, res) => {
  const { studentName, gender, birthDate, parentName, parentContact, address, classDuration, classLocation, email } = req.body;

  connection.query(
    "INSERT INTO student_info (studentName, gender, birthDate, parentName, parentContact, address, classDuration, classLocation, email) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)", 
    [studentName, gender, birthDate, parentName || null, parentContact, address || null, classDuration || null, classLocation || null, email || null], 
    (err, results) => {
      if (err) return res.status(500).json({ message: "插入学生数据失败", error: err });
      res.json({ message: "学生添加成功", id: results.insertId });
    }
  );
});

// 更新学生信息
router.put("/:id", validateStudentData, (req, res) => {
  const { id } = req.params;
  const { studentName, gender, birthDate, parentName, parentContact, address, classDuration, classLocation, email } = req.body;

  connection.query(
    "UPDATE student_info SET studentName = ?, gender = ?, birthDate = ?, parentName = ?, parentContact = ?, address = ?, classDuration = ?, classLocation = ?, email = ? WHERE id = ?",
    [studentName, gender, birthDate, parentName || null, parentContact, address || null, classDuration || null, classLocation || null, email || null, id],
    (err, results) => {
      if (err) return res.status(500).json({ message: "更新学生数据失败", error: err });
      res.json({ message: "学生信息已更新" });
    }
  );
});

// 删除学生
router.delete("/:id", (req, res) => {
  const { id } = req.params;

  connection.query("DELETE FROM student_info WHERE id = ?", [id], (err) => {
    if (err) return res.status(500).json({ message: "删除学生数据失败" });
    res.json({ message: "学生已删除" });
  });
});

module.exports = router;
