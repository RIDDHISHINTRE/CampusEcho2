const fs = require("fs");
const path = require("path");
const sequelize = require("../config/database"); // Ensure database connection is established
require('dotenv').config({ path: __dirname + '/../.env' });
const { WorkExperience } = require("../models/asso"); // Ensure correct model import

async function generateJobRolesFile() {
    try {
        // Test DB connection
        await sequelize.authenticate();
        console.log("Database connection established.");

        // Ensure the directory exists
        const dirPath = path.join(__dirname, "../data");
        if (!fs.existsSync(dirPath)) {
            fs.mkdirSync(dirPath, { recursive: true });
        }

        // Fetch unique job roles from the database
        const jobRoles = await WorkExperience.findAll({
            attributes: ["role"],
            group: ["role"],
            raw: true,
        });

        // Extract role names and clean data
        const rolesList = jobRoles.map((job) => job.role.toLowerCase().trim());

        // Save to file
        const filePath = path.join(dirPath, "job_roles.txt");
        fs.writeFileSync(filePath, rolesList.join("\n"));
        console.log(`Job roles saved to ${filePath}`);

        // Close DB connection after script execution
        await sequelize.close();
    } catch (error) {
        console.error("Error generating job roles file:", error);
    }
}

// Run the script
generateJobRolesFile();
