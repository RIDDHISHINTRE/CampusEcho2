const { Op } = require("sequelize");
const Message = require("../models/Message");

const deleteOldMessages = async () => {
    try {
        const twoDaysAgo = new Date();
        twoDaysAgo.setDate(twoDaysAgo.getDate() - 2);

        const deletedCount = await Message.destroy({
            where: { createdAt: { [Op.lt]: twoDaysAgo } }
        });

        console.log(`🗑️ Deleted ${deletedCount} old messages.`);
    } catch (error) {
        console.error("❌ Error deleting old messages:", error);
    }
};

module.exports = deleteOldMessages;
