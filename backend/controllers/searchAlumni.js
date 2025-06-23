


const { Op, Sequelize } = require("sequelize");
const { Alumni, WorkExperience } = require("../models/asso");

const VALID_BRANCHES = ["comp", "it", "ece", "aids", "entc"];

const searchAlumni = async (req, res) => {
    try {
        const { name, branch, role, companyName, minExperience, maxExperience } = req.query;

        const alumniQuery = {
            where: {
                ...(name && { name: { [Op.iLike]: `%${name}%` } }),
                ...(branch && VALID_BRANCHES.includes(branch.toLowerCase()) && { branch }),
            },
            include: [],
        };

        if (minExperience || maxExperience || role || companyName) {
            const workExpConditions = {};

            // ✅ Role-based filtering using ILIKE + SIMILARITY
            if (role) {
                workExpConditions.role = {
                    [Op.or]: [
                        { [Op.iLike]: `%${role}%` },
                        Sequelize.literal(`SIMILARITY(role, '${role}') > 0.3`)
                    ]
                };
            }

            // ✅ Company name filter
            if (companyName) {
                workExpConditions.companyName = { [Op.iLike]: `%${companyName}%` };
            }

            // ✅ Experience range handling
            if (minExperience || maxExperience) {
                workExpConditions.yearsOfExperience = {};
                if (minExperience) {
                    workExpConditions.yearsOfExperience[Op.gte] = parseInt(minExperience) || 0;
                }
                if (maxExperience) {
                    workExpConditions.yearsOfExperience[Op.lte] = parseInt(maxExperience) || 100;
                }
            }

            alumniQuery.include.push({
                model: WorkExperience,
                where: workExpConditions,
                required: true
            });
        }

        const alumni = await Alumni.findAll(alumniQuery);
        res.json(alumni);
    } catch (error) {
        console.error("Error searching alumni:", error);
        res.status(500).json({
            error: "Internal server error",
            ...(process.env.NODE_ENV === 'development' && { details: error.message })
        });
    }
};

module.exports = { searchAlumni };





