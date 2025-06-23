// "use strict";

// const fs = require("fs");
// const path = require("path");
// const Sequelize = require("sequelize");
// const process = require("process");

// const basename = path.basename(__filename);
// const env = process.env.NODE_ENV || "development";
// const config = require(__dirname + "/../config/config.json")[env];

// const db = {};

// let sequelize;
// if (config.use_env_variable) {
//   sequelize = new Sequelize(process.env[config.use_env_variable], config);
// } else {
//   sequelize = new Sequelize(config.database, config.username, config.password, config);
// }


"use strict";

const Sequelize = require("sequelize");
const path = require("path");
const process = require("process");
const config = require("../config/config.json")[process.env.NODE_ENV || "development"];
const { Alumni, WorkExperience } = require("./asso"); // Import associations

const db = {};

let sequelize;
if (config.use_env_variable) {
  sequelize = new Sequelize(process.env[config.use_env_variable], config);
} else {
  sequelize = new Sequelize(config.database, config.username, config.password, config);
}

// Attach Sequelize instance to models
db.sequelize = sequelize;
db.Sequelize = Sequelize;

// Attach models
db.Alumni = Alumni;
db.WorkExperience = WorkExperience;

module.exports = db;






