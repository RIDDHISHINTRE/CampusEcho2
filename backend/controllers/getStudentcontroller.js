const Student = require('../models/studentModel');
const Alumni = require('../models/Alumni');
const WorkExperience =require('../models/WorkExperience')

const getStudentProfile = async (req, res) => {
  try {

    const { id } = req.params;
    
    // Find student by primary key (ID)
    const student = await Student.findByPk(id);

    if (!student) {
      return res.status(404).json({ message: 'Student not found' });
    }

    // Remove sensitive fields like password before sending the response
    const { password, ...studentData } = student.toJSON();

    res.status(200).json(studentData);
  } catch (error) {
  
    res.status(500).json({ message: 'Internal server error' });
  }
};

const getAlumniProfile = async (req, res) => {
  try {
 

    const { id } = req.params;

    // Find alumni by primary key (ID) and include Work Experience
    const alumni = await Alumni.findByPk(id, {
      include: [{ model: WorkExperience }], // Include Work Experience
    });

    if (!alumni) {
      return res.status(404).json({ message: "Alumni not found" });
    }

    // Remove sensitive fields like password before sending the response
    const { password, ...alumniData } = alumni.toJSON();

    res.status(200).json(alumniData);
  } catch (error) {
    console.error("Error fetching alumni profile:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};


module.exports = {
  getStudentProfile,
  getAlumniProfile
};