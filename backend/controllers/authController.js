const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const Student = require('../models/studentModel');
const Alumni = require('../models/Alumni');
require('dotenv').config();

// ✅ Register Student
const registerStudent = async (req, res) => {
  const { name, email, collegeid, branch, year, collegeIdPhoto } = req.body;

  if (!name || !email || !collegeid || !branch || !year) {
    return res.status(400).json({ error: 'All fields are required' });
  }

  try {
    const existingStudent = await Student.findOne({ where: { email } });
    if (existingStudent) {
      return res.status(400).json({ error: 'Email already registered' });
    }

    if (collegeIdPhoto && !/^https?:\/\/.+\..+/.test(collegeIdPhoto)) {
      return res.status(400).json({ error: 'Invalid college ID photo URL' });
    }

    const student = await Student.create({
      name,
      email,
      collegeid,
      branch,
      year,
      collegeIdPhoto
    });

    res.status(201).json({ message: 'Student registered successfully', student });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// ✅ Register Alumni
const registerAlumni = async (req, res) => {
  const { name, email, collegeid, branch, graduateCollegeYear, DegreePhoto } = req.body;

  if (!name || !email || !collegeid || !branch || !graduateCollegeYear) {
    return res.status(400).json({ error: 'All fields are required' });
  }

  try {
    const existingAlumni = await Alumni.findOne({ where: { email } });
    if (existingAlumni) {
      return res.status(400).json({ error: 'Email already registered' });
    }

    if (DegreePhoto && !/^https?:\/\/.+\..+/.test(DegreePhoto)) {
      return res.status(400).json({ error: 'Invalid degree photo URL' });
    }

    const alumni = await Alumni.create({
      name,
      email,
      collegeid,
      branch,
      graduateCollegeYear,
      DegreePhoto
    });

    res.status(201).json({ message: 'Alumni registered successfully', alumni });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// ✅ Login Student/Admin
const loginStudent = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ error: 'Email and password are required' });
  }

  try {
    const student = await Student.findOne({ where: { email } });
    if (!student) {
      return res.status(404).json({ error: 'Student not found' });
    }

    if (!student.password) {
      return res.status(400).json({ error: 'Password not set for this user. Please contact admin.' });
    }

    const isMatch = await bcrypt.compare(password, student.password);
    if (!isMatch) {
      return res.status(400).json({ error: 'Invalid credentials' });
    }

    const token = jwt.sign(
      { id: student.id, userType: "student", isAdmin: student.isAdmin },
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
    );

    res.status(200).json({ message: 'Login successful', token, id: student.id, isAdmin: student.isAdmin, userType: "student" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// ✅ Login Alumni
const loginAlumni = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ error: 'Email and password are required' });
  }

  try {
    const alumni = await Alumni.findOne({ where: { email } });
    if (!alumni) {
      return res.status(404).json({ error: 'Alumni not found' });
    }

    if (!alumni.password) {
      return res.status(400).json({ error: 'Password not set for this user. Please contact admin.' });
    }

    const isMatch = await bcrypt.compare(password, alumni.password);
    if (!isMatch) {
      return res.status(400).json({ error: 'Invalid credentials' });
    }

    const token = jwt.sign(
      { id: alumni.id, userType: "alumni" },
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
    );

    res.status(200).json({ message: 'Login successful', token, id: alumni.id, userType: "alumni" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  registerStudent,
  registerAlumni,
  loginStudent,
  loginAlumni
};


