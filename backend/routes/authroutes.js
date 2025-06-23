const express = require('express');
const {
  registerStudent,
  registerAlumni,
  loginStudent,
  loginAlumni
} = require('../controllers/authController');

const router = express.Router();

// Student routes
router.post('/student/register',registerStudent);
router.post('/student/login' , loginStudent);

// Alumni routes
router.post('/alumni/register',  registerAlumni);
router.post('/alumni/login', loginAlumni);

module.exports = router;