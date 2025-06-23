const express = require("express");
const router = express.Router();
const  { searchAlumni }  = require("../controllers/searchAlumni");
const { getAlumniDetails } =require("../controllers/AlumniDetails");

router.get('/search-alumni', searchAlumni);
router.get('/alumni-details/:id' ,getAlumniDetails);

module.exports = router;