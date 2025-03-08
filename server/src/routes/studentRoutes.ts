import express from "express";
import Student from "../models/Student";
import authMiddleware from "../middleware/authMiddleware";

const router = express.Router();

// 获取所有学生数据
router.get("/", authMiddleware, async (req, res) => {
  try {
    const students = await Student.find();
    res.json(students);
  } catch (error) {
    res.status(500).json({ error: "获取学生数据失败" });
  }
});

// 获取单个学生数据
router.get("/:id", authMiddleware, async (req, res): Promise<void> => {
  try {
    const student = await Student.findById(req.params.id);
    if (!student) {
      res.status(404).json({ error: "学生未找到" });
      return;
    }
    res.json(student);
  } catch (error) {
    res.status(500).json({ error: "获取学生信息失败" });
  }
});

// 创建学生
router.post("/", authMiddleware, async (req, res): Promise<void> => {
  try {
    const { studentName, gender, birthDate, parentName, parentContact, address, classDuration, classLocation, email } =
      req.body;

    if (!studentName || !gender || !birthDate || !parentContact)
      res.status(400).json({ error: "缺少必填字段" });

    const newStudent = new Student({
      studentName,
      gender,
      birthDate,
      parentName,
      parentContact,
      address,
      classDuration,
      classLocation,
      email,
    });

    await newStudent.save();
    res.status(201).json({ message: "学生创建成功" });
    return;
  } catch (error) {
    res.status(500).json({ error: "创建学生失败" });
    return;
  }
});

// 更新学生信息
router.put("/:id", authMiddleware, async (req, res): Promise<void> => {
  try {
    const { studentName, gender, birthDate, parentName, parentContact, address, classDuration, classLocation, email } =
      req.body;

    const updatedStudent = await Student.findByIdAndUpdate(
      req.params.id,
      { studentName, gender, birthDate, parentName, parentContact, address, classDuration, classLocation, email },
      { new: true }
    );

    if (!updatedStudent) {
      res.status(404).json({ error: "学生未找到" });
      return;
    }

    res.json({ message: "学生信息更新成功", student: updatedStudent });
    return;
  } catch (error) {
    res.status(500).json({ error: "更新学生信息失败" });
    return;
  }
});

// 删除学生
router.delete("/:id", authMiddleware, async (req, res): Promise<void> => {
  try {
    const student = await Student.findByIdAndDelete(req.params.id);
    if (!student) {
      res.status(404).json({ error: "学生未找到" });
      return;
    }

    res.json({ message: "学生删除成功" });
    return;
  } catch (error) {
    res.status(500).json({ error: "删除学生失败" });
    return;
  }
});

export default router;
