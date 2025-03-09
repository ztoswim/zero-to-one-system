import express from "express";
import Student from "../models/Student";
import authMiddleware from "../middleware/authMiddleware";

const router = express.Router();

// 获取所有学生数据
router.get("/", authMiddleware, async (req, res) => {
  try {
    const students = await Student.find();
    res.json({ success: true, message: "学生数据获取成功", data: students });
  } catch (error) {
    res.status(500).json({ success: false, message: "获取学生数据失败" });
  }
});

// 获取单个学生数据
router.get("/:id", authMiddleware, async (req, res): Promise<void> => {
  try {
    const student = await Student.findById(req.params.id);
    if (!student) {
      res.status(404).json({ success: false, message: "学生未找到" });
      return;
    }
    res.json({ success: true, message: "学生信息获取成功", data: student });
  } catch (error) {
    res.status(500).json({ success: false, message: "获取学生信息失败" });
  }
});

// 创建学生
router.post("/", authMiddleware, async (req, res): Promise<void> => {
  try {
    const { studentName, gender, birthDate, parentName, parentContact, address, classDuration, classLocation, email } =
      req.body;

    if (!studentName || !gender || !birthDate || !parentContact) {
      res.status(400).json({ success: false, message: "缺少必填字段" });
      return;
    }

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
    res.status(201).json({ success: true, message: "学生创建成功", data: newStudent });
  } catch (error) {
    res.status(500).json({ success: false, message: "创建学生失败" });
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
      res.status(404).json({ success: false, message: "学生未找到" });
      return;
    }

    res.json({ success: true, message: "学生信息更新成功", data: updatedStudent });
  } catch (error) {
    res.status(500).json({ success: false, message: "更新学生信息失败" });
  }
});

// 删除学生
router.delete("/:id", authMiddleware, async (req, res): Promise<void> => {
  try {
    const student = await Student.findByIdAndDelete(req.params.id);
    if (!student) {
      res.status(404).json({ success: false, message: "学生未找到" });
      return;
    }

    res.json({ success: true, message: "学生删除成功", data: null });
  } catch (error) {
    res.status(500).json({ success: false, message: "删除学生失败" });
  }
});

export default router;
