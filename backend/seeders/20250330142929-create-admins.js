const bcrypt = require("bcrypt");

module.exports = {
  async up(queryInterface) {
    const hashedPassword1 = await bcrypt.hash("Admin@123", 10); // Change password as needed
    const hashedPassword2 = await bcrypt.hash("Admin@456", 10);

    await queryInterface.bulkInsert("Student", [
      {
        name: "Admin Riddhi",
        email: "pratikshashintre@gmail.com", 
        password: hashedPassword1,
        bio:"Admin 1",
        isAdmin: true, 
        collegeid :"C2K2317N",
        branch:"comp",
        year :"second",
        // isVerified :"true",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Admin Varsha",
        email: "varshatembugade346@gmail.com", 
        password: hashedPassword2,
        bio:"Admin 2",
        isAdmin: true, 
        collegeid :"C2K231263",
        branch:"comp",
        // isVerified:"true",
      
        year :"second",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete("Student", { email: ["pratikshashintre@gmail.com", "varshatembugade346@gmail.com"] });
  },
};

