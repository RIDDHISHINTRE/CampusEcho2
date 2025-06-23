const Feedback = require("../models/Feedback");
const Student = require("../models/studentModel");
const Alumni = require("../models/Alumni")

const submitFeedback = async (req, res) => {
  try {
    console.log("Request Body:", req.body);

    const { userId, userType, description } = req.body;

    if (!userId || !userType) {
      return res.status(400).json({ message: "User ID, User Type, and Email are required!" });
    }

    let user = null;

    // Check if user exists in Student or Alumni table and get their email
    if (userType === "student") {
      user = await Student.findByPk(userId);
    } else if (userType === "alumni") {
      user = await Alumni.findByPk(userId);
    }

    if (!user) {
      return res.status(404).json({ message: "User not found in Student or Alumni records!" });
    }

    // Verify if the provided email matches the stored email
    if (!user.email) {
      return res.status(403).json({ message: "The provided email does not match our records." });
    }
    const email = user.email;
    const name = user.name;
    // Create feedback entry
    const feedback = await Feedback.create({ userId, userType, email ,name ,description });

    res.status(201).json({ message: "Feedback submitted successfully!", feedback });
  } catch (error) {
    console.error("Error submitting feedback:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const getAllFeedback = async (req, res) => {
  try {
   
    // Fetch all feedback, ordered by newest first
    const feedbacks = await Feedback.findAll({ order: [["createdAt", "DESC"]] });

    res.status(200).json(feedbacks);
  } catch (error) {
    console.error("Error fetching feedback:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = {
  submitFeedback,
  getAllFeedback,
};


