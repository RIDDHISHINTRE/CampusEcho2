const express = require("express");
const { authMiddleware, jobOwnerMiddleware } = require("../middlewares/authMiddleware");
const {
  postJob,
  getAllJobs,
  getJobsByAlumniId,
  getJobById,
  deleteJob,
} = require("../controllers/jobController");

const router = express.Router();

router.post("/post", authMiddleware, postJob);

router.get("/all",  getAllJobs);


router.get("/alumni/:id", authMiddleware, getJobsByAlumniId);


router.get("/:id", getJobById);


router.delete("/:id", authMiddleware, jobOwnerMiddleware, deleteJob);

module.exports = router;
