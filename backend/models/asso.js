const Alumni = require("./Alumni");
const WorkExperience = require("./WorkExperience");


// Define associations
Alumni.hasMany(WorkExperience, { foreignKey: "alumniId", onDelete: "CASCADE" });
WorkExperience.belongsTo(Alumni, { foreignKey: "alumniId", onDelete: "CASCADE" });


module.exports = { Alumni, WorkExperience  }; // Export models with associations
