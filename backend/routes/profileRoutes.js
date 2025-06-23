

const express =require('express');
const router = express.Router();
const { authMiddleware } = require('../middlewares/authMiddleware');
const { getStudentProfile } =require('../controllers/getStudentcontroller')
const { updateStudentProfile }= require('../controllers/profilecontroller');
const { getAlumniProfile} = require('../controllers/getStudentcontroller');
const { updateAlumniProfile } = require('../controllers/profilecontroller');
const { deleteWorkExperience} = require('../controllers/profilecontroller');
const { updateWorkExperience }=require('../controllers/profilecontroller');

router.get('/student/:id',getStudentProfile);
router.put('/student/edit/:id' ,updateStudentProfile);
router.get('/alumni/:id',getAlumniProfile);
router.put('/alumni/edit/:id' ,updateAlumniProfile);
router.delete('/alumni/experience/:id',authMiddleware ,deleteWorkExperience);
router.put('/alumni/:alumniId/experience/:expId' ,authMiddleware ,updateWorkExperience);

module.exports =router;