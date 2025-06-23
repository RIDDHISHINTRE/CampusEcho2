
const jwt = require("jsonwebtoken");
const Job = require("../models/JobModel"); 
require("dotenv").config();

// ✅ General Authentication Middleware
const authMiddleware = (req, res, next) => {
    const authHeader = req.header("Authorization");
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        return res.status(401).json({ message: "Access denied. No token provided." });
    }

    const token = authHeader.split(" ")[1]; // Extract token

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = { id: decoded.id, userType: decoded.userType, isAdmin: !!decoded.isAdmin }; // Ensure `isAdmin` is boolean
        next();
    } catch (error) {
        return res.status(400).json({ message: "Invalid token" });
    }
};

// ✅ Admin Authentication Middleware
const authenticateAdmin = (req, res, next) => {
    if (!req.user) {
        return res.status(401).json({ message: "Unauthorized. Please login again." });
    }
    
    if (req.user.isAdmin !== true) {
        return res.status(403).json({ message: "Access denied. Admins only." });
    }

    next();
};

// ✅ Middleware to Check if User is Job Owner
const jobOwnerMiddleware = async (req, res, next) => {
    try {
        const { id } = req.params; // Job ID from URL
        const job = await Job.findByPk(id);

        if (!job) {
            return res.status(404).json({ message: "Job not found" });
        }

        // Check if the logged-in user is the job creator
        if (job.createdBy !== req.user.id) {
            return res.status(403).json({ message: "Unauthorized to delete this job" });
        }

        next(); // Allow deletion
    } catch (error) {
        res.status(500).json({ message: "Server error", error });
    }
};

module.exports = { authMiddleware, authenticateAdmin, jobOwnerMiddleware };


