const express = require('express');
const bcrypt = require('bcryptjs');
require('dotenv').config();
const jwt = require('jsonwebtoken');
const transporter = require('../config/nodemailerConfig');
const  Alumni  = require('../models/Alumni');
const  Student =require('../models/studentModel');

const router = express.Router();

// Forgot Password Route
const forgotPassword = async (req, res) => {
    try {
        const { email } = req.body;

        const alumni = await Alumni.findOne({ where: { email } });
        const student = await Student.findOne({ where: { email } });
        const user = alumni || student;

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        const resetToken = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
            expiresIn: "1h",
        });
        user.reset_token = resetToken;
        user.reset_token_expiry = new Date(Date.now() + 3600000);
        await user.save();

        const resetLink = `${process.env.FRONTEND_URL}/reset-password/${resetToken}`;

        await transporter.sendMail({
            from: process.env.EMAIL_USER,
            to: user.email,
            subject: "Password Reset Request",
            html: `<p>Click <a href="${resetLink}">here</a> to reset your password</p>`
        });

        res.json({ message: "Password reset email sent" });
    } catch (error) {
        res.status(500).json({ message: "Internal server error", error: error.message });
    }
}

// Reset Password Route
const resetPassword = async (req, res) => {
    try {
        const { token } = req.params;
        const { newPassword } = req.body;

        let decoded;
        try {
            decoded = jwt.verify(token, process.env.JWT_SECRET);
        } catch (error) {
            return res.status(400).json({ message: "Invalid or expired token", error: error.message });
        }

        const alumni = await Alumni.findOne({ where: { id: decoded.id } });
        const student = await Student.findOne({ where: { id: decoded.id } });
        const user = alumni || student;

        if (!user || user.reset_token !== token || user.reset_token_expiry < new Date()) {
            return res.status(400).json({ message: "Invalid or expired token" });
        }

        const hashedPassword = await bcrypt.hash(newPassword, 10);
        await user.update({ password: hashedPassword, reset_token: null, reset_token_expiry: null });

        res.status(200).json({ message: "Password updated successfully" });

    } catch (error) {
        res.status(500).json({ message: "Internal server error", error: error.message });
    }
}

module.exports = { forgotPassword ,resetPassword};


