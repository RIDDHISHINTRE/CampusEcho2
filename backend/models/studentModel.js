const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const bcrypt = require('bcryptjs');

const Student = sequelize.define('Student', {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      notEmpty: true,
    },
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
    validate: {
      isEmail: true,
    },
  },
 
  bio: 
  { 
    type: DataTypes.TEXT
   },
  password: {
    type: DataTypes.STRING,
    allowNull: true,
    validate: {
      len: [8, 100],
    },
  },
  collegeid: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
    validate: {
      is: '^[a-zA-Z0-9@]+$', // Passed as a string, not RegExp
    },
  },
  branch: {
    type: DataTypes.ENUM('comp','it','ece','aids','entc'),
    allowNull: false,
  },
  year: {
    type: DataTypes.ENUM('first','second','third','fourth'),
    allowNull: false,
  },
  isAdmin: {
    type: DataTypes.BOOLEAN,
    defaultValue: false, 
  },
  isVerified: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
  reset_token: 
  { type: DataTypes.STRING,
     allowNull: true 
  },

  reset_token_expiry:
   { type: DataTypes.DATE, 
    allowNull: true 
  },
  collegeIdPhoto: {
    type: DataTypes.STRING,
    allowNull: true,
    validate: {
      isUrl: true,
    },
  }
},{
   tableName :'Student'
   ,timestamps: true

});


module.exports = Student;