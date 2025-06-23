const  Job  = require("../models/JobModel");
const Alumni = require("../models/Alumni");

// ✅ Post a Job (Only Alumni)
exports.postJob = async (req, res) => {
  try {
    const { title, description, applicationLink, deadline, location, eligibility } = req.body;

    // Ensure only alumni can post jobs
    const alumni = await Alumni.findByPk(req.user.id);

    if (!alumni) {
      return res.status(403).json({ message: "Only alumni can post jobs" });
    }

    const newJob = await Job.create({
      title,
      description,
      applicationLink,
      deadline,
      location,
      eligibility,
      createdBy: req.user.id, // Automatically assigns the alumniId
    });

    res.status(201).json({ message: "Job posted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error posting job", error });
  }
};


exports.getAllJobs = async (req, res) => {
  try {
    const jobs = await Job.findAll({ order: [["deadline", "DESC"]] }); // ✅ FIXED: Latest jobs first
    res.status(200).json(jobs);
  } catch (error) {
    res.status(500).json({ message: "Error fetching jobs", error });
  }
};

exports.getJobsByAlumniId = async (req, res) => {
  try {
    const { id } = req.params; // Get alumni ID from URL parameter

    const jobs = await Job.findAll({ where: { createdBy: id } });

    if (!jobs.length) {
      return res.status(404).json({ message: "No jobs found for this alumni" });
    }

    res.status(200).json(jobs);
  } catch (error) {
    res.status(500).json({ message: "Error fetching jobs for this alumni", error });
  }
};


exports.getJobById = async (req, res) => {
  try {
    const { id } = req.params;
    const job = await Job.findByPk(id);

    if (!job) {
      return res.status(404).json({ message: "Job not found" });
    }

    res.status(200).json(job);
  } catch (error) {
    res.status(500).json({ message: "Error fetching job", error });
  }
};


exports.deleteJob = async (req, res) => {
  try {
    const { id } = req.params;

   
    await Job.destroy({ where: { id } });

    res.status(200).json({ message: "Job deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting job", error });
  }
};


