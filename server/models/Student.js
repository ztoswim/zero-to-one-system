const mongoose = require("mongoose");

const studentSchema = new mongoose.Schema({
  studentName: { type: String, required: true },
  gender: { type: String, required: true },
  birthDate: { type: Date, required: true },
  parentName: { type: String, default: null },
  parentContact: { type: String, required: true },
  address: { type: String, default: null },
  classDuration: { type: String, default: null },
  classLocation: { type: String, default: null },
  email: { type: String, unique: true, sparse: true, default: null },
}, { timestamps: true });

module.exports = mongoose.model("Student", studentSchema);
