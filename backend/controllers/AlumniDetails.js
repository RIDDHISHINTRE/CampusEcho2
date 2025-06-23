const { Op } = require("sequelize");
const { Alumni, WorkExperience} = require("../models/asso");
const JobModel = require("../models/JobModel");

const getAlumniDetails = async (req, res) => {
    try {
        const { id } = req.params;

        // Fetch alumni details along with work experience
        const alumni = await Alumni.findOne({
            where: { id },
            include: [
                {
                    model: WorkExperience,
                    attributes: ["role", "companyName", "yearsOfExperience"]
                }
            ]
        });

        if (!alumni) {
            return res.status(404).json({ error: "Alumni not found" });
        }

        // Fetch all jobs posted by this alumni ID
        const jobs = await JobModel.findAll({
            where: { createdBy : id },
            attributes: ["title", "description","applicationLink" ]
        });

        res.json({
            alumni,
            jobs,  // Send jobs separately
            messageOption: "Available" // Indicating the messaging feature
        });
    } catch (error) {
        console.error("Error fetching alumni details:", error);
        res.status(500).json({ error: "Internal server error" });
    }
};

module.exports = { getAlumniDetails };