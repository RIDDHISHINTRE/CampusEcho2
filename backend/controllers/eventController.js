
const { Op } = require("sequelize");
const Event = require("../models/Event");
const cron = require("node-cron");
const Student = require("../models/studentModel");


// Get upcoming events (next 2-3 events closest to today's date)
exports.getUpcomingEvents = async (req, res) => {
    try {
        const today = new Date();

        const events = await Event.findAll({
            where: {
                date: {
                    [Op.gte]: today, // Only future events
                },
            },
            order: [["date", "ASC"]], // Sort by closest date first
            limit: 3, // Get only 2-3 events
        });

        res.status(200).json(events);
    } catch (error) {
        res.status(500).json({ message: "Error fetching upcoming events", error });
    }
};

// Get all events (for the events listing page)
exports.getAllEvents = async (req, res) => {
    try {
        const events = await Event.findAll({
            order: [["date", "ASC"]],
        });

        res.status(200).json(events);
    } catch (error) {
        res.status(500).json({ message: "Error fetching events", error });
    }
};

// Get a specific event by ID (for event details page)
exports.getEventById = async (req, res) => {
    try {
        const { id } = req.params;
        const event = await Event.findByPk(id);

        if (!event) {
            return res.status(404).json({ message: "Event not found" });
        }

        res.status(200).json(event);
    } catch (error) {
        res.status(500).json({ message: "Error fetching event details", error });
    }
};

// Create an event (with Google Form link for alumni only)
exports.createEvent = async (req, res) => {
    try {
        const { title, date, description, location, googleFormLink ,EventImage} = req.body; 
        const createdBy = req.user.id; // Authenticated user ID
        const userType = req.user.userType; // Student or Alumni
        
        if (EventImage && !/^https?:\/\/.+\..+/.test(EventImage)) {
            return res.status(400).json({ error: 'Invalid Image photo URL' });
        }
    
        // Allow adding Google Form link only if the user is a student
        const newEvent = await Event.create({
            title,
            date,
            description,
            location,
            createdBy,
            EventImage,
            googleFormLink: userType === "student" ? googleFormLink || null : null // Only allow for students
        });

        res.status(201).json(newEvent);
    } catch (error) {
        res.status(500).json({ message: "Error creating event", error });
    }
};




exports.deleteEvent = async (req, res) => {
  console.log("Decoded User:", req.user); // { id, role }
  try {
    const { id } = req.params; // Event ID
    const userId = req.user.id; // Authenticated user ID

    const event = await Event.findByPk(id);
    if (!event) {
      return res.status(404).json({ message: "Event not found" });
    }

    console.log("Event created by:", event.createdBy);
    console.log("Logged-in user ID:", userId);

    // Case 1: User is the creator
    if (Number(event.createdBy) === Number(userId)) {
      await event.destroy();
      return res.status(200).json({ message: "Event deleted successfully" });
    }

    // Case 2: User is a student and isAdmin === true
    const student = await Student.findByPk(userId);
    if (student && student.isAdmin) {
      await event.destroy();
      return res.status(200).json({ message: "Event deleted by admin successfully" });
    }

    // Otherwise, not authorized
    return res.status(403).json({ message: "Not authorized to delete this event" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error deleting event", error });
  }
};


// Function to delete past events
const deletePastEvents = async () => {
    try {
        const today = new Date();
        await Event.destroy({
            where: {
                date: { [Op.lt]: today },
            },
        });
        console.log("✅ Past events deleted successfully.");
    } catch (error) {
        console.error("❌ Error deleting past events:", error);
    }
};

// Schedule task to run every night at midnight (00:00)
cron.schedule("0 0 * * *", () => {
    console.log("🕛 Running scheduled event cleanup...");
    deletePastEvents();
} ,{
    timezone: "Asia/Kolkata"
});
