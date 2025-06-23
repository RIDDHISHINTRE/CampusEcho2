const Job = require("../models/JobModel");
const { Op } = require("sequelize");

const deleteExpiredJobs = async () => {
  try {
    const currentDate = new Date(); // Get current date
    const result = await Job.destroy({
      where: { deadline: { [Op.lt]: currentDate } }, // Delete expired jobs
    });

    if (result > 0) {
      console.log(`✅ Deleted ${result} expired jobs.`);
    } else {
      console.log("✅ No expired jobs found.");
    }
  } catch (error) {
    console.error("❌ Error deleting expired jobs:", error);
  }
};

module.exports = deleteExpiredJobs;

