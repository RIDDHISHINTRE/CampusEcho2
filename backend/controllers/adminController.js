const bcrypt = require("bcryptjs");
const crypto = require("crypto");
require("dotenv").config();
const nodemailer = require("nodemailer");
const Feedback = require("../models/Feedback");
const Student = require("../models/studentModel");
const Alumni = require("../models/Alumni");

// ✅ Get all feedback (Admin only)
const getAllFeedback = async (req, res) => {
  try {
    const feedback = await Feedback.findAll();
    res.json(feedback);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// ✅ Delete feedback (Admin only)
const deleteFeedback = async (req, res) => {
  try {
    const { id } = req.params;
    const feedback = await Feedback.findByPk(id);

    if (!feedback) {
      return res.status(404).json({ message: "Feedback not found" });
    }

    await feedback.destroy();
    res.json({ message: "Feedback deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// ✅ Verify user (Admin only)
const verifyUser = async (req, res) => {
  try {
    const { userId, userType } = req.body;
    
    let user;
    if (userType === "student") {
      user = await Student.findByPk(userId);
    } else if (userType === "alumni") {
      user = await Alumni.findByPk(userId);
    }
    
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    if (user.isVerified || user.isAdmin === true) {
      return res.status(400).json({ message: "User already verified" });
    }

    // ✅ Generate a temporary password
    const tempPassword = crypto.randomBytes(4).toString("hex");
    const hashedPassword = await bcrypt.hash(tempPassword, 10);

    // ✅ Update user in DB
    user.isVerified = true;
    user.password = hashedPassword;
    await user.save();

    // ✅ Send email with credentials
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER, 
        pass: process.env.EMAIL_PASS,
      },
    });

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: user.email,
      subject: "Account Verified - Login Credentials",
      text: `Your account has been verified.\nEmail: ${user.email}\nTemporary Password: ${tempPassword}\nPlease login and change your password.`,
    };

    await transporter.sendMail(mailOptions);
    console.log("Tempassword is:" ,tempPassword);
    res.status(200).json({ message: "User verified successfully", tempPassword });
  } catch (error) {
    console.error("Error verifying user:", error.message);
    console.error(error.stack);
    res.status(500).json({ message: "Internal server error" });
  }
};


const getUnverifiedUsers = async (req, res) => {
  try {
    const students = await Student.findAll({ where: { isVerified: false } });
    const alumni = await Alumni.findAll({ where: { isVerified: false } });

    const formattedStudents = students.map((student) => ({
      ...student.toJSON(),
      userType: 'student',
    }));

    const formattedAlumni = alumni.map((alumnus) => ({
      ...alumnus.toJSON(),
      userType: 'alumni',
    }));

    // const unverifiedUsers = [...formattedStudents, ...formattedAlumni];

    res.status(200).json({
      students: formattedStudents,
      alumni: formattedAlumni,
    });
  } catch (error) {
    console.error("Error fetching unverified users:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};


const unverifyUser = async (req, res) => {
  try {
    const { userId, userType } = req.body;

    let user;
    if (userType === "student") {
      user = await Student.findByPk(userId);
    } else if (userType === "alumni") {
      user = await Alumni.findByPk(userId);
    }

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Delete the user from DB
    await user.destroy();

    res.status(200).json({ message: "User account deleted successfully" });
  } catch (error) {
    console.error("Error deleting user:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};


module.exports = { getAllFeedback, deleteFeedback, verifyUser, getUnverifiedUsers ,unverifyUser };

