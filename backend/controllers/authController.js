const jwt = require('jsonwebtoken');
const Student = require('../models/studentModel');
const Alumni = require('../models/Alumni');
require('dotenv').config();
const express = require('express');


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

    // Optional: Validate URL format
    if (collegeIdPhoto && !/^https?:\/\/.+\..+/.test(collegeIdPhoto)) {
      return res.status(400).json({ error: 'Invalid college ID photo URL' });
    }

    const student = await Student.create({
      name,
      email,
      collegeid,
      branch,
      year,
      
      collegeIdPhoto, // Save the URL
    });

    res.status(201).json({ message: 'Student registered successfully', student });
  } catch (error) {
    res.status(500).json({ error : error.message});
  }
};


// Register Alumni
const registerAlumni = async (req, res) => {
  const { name, email, collegeid, branch, graduateCollegeYear,DegreePhoto} = req.body;

  if (!name || !email || !collegeid || !branch || !graduateCollegeYear ) {
    return res.status(400).json({ error: 'All fields are required' });
  }

  try {
    const existingAlumni = await Alumni.findOne({ where: { email } });
    if (existingAlumni) {
      return res.status(400).json({ error: 'Email already registered' });
    }
    if (DegreePhoto && !/^https?:\/\/.+\..+/.test(DegreePhoto)) {
      return res.status(400).json({ error: 'Invalid college ID photo URL' });
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


// Login Student or Admin
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

    // const isMatch = await student.isValidPassword(password);
    // if (!isMatch) {
    //   return res.status(400).json({ error: 'Invalid credentials' });
    // }

    const token = jwt.sign({ id: student.id ,userType: String("student") ,isAdmin: student.isAdmin}, process.env.JWT_SECRET, { expiresIn: '1h' } );
    res.status(200).json({ message: 'Login successful', token, id: student.id, isAdmin: student.isAdmin ,userType: String("student") });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};



// Login Alumni
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

    // const isMatch = await alumni.isValidPassword(password);
    // if (!isMatch) {
    //   return res.status(400).json({ error: 'Invalid credentials' });
    // }

    const token = jwt.sign({ id: alumni.id ,userType: String("alumni")}, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.status(200).json({ message: 'Login successful', token, id: alumni.id, userType: String("alumni") });
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


