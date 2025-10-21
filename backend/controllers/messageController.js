const { Op } = require("sequelize");  // ✅ Import Op for query conditions
const Message = require("../models/Message");
const Student = require("../models/studentModel");
const Alumni = require("../models/Alumni");

const sendMessage = async (req, res) => {
    try {
        const { senderId, receiverId, message } = req.body;

        // ✅ Prevent sending empty messages
        if (!message || !message.trim()) {
            return res.status(400).json({ success: false, message: "Message cannot be empty." });
        }

        // ✅ Check if sender exists in Student or Alumni table
        const senderExists = await Student.findByPk(senderId) || await Alumni.findByPk(senderId);
        if (!senderExists) {
            return res.status(400).json({ success: false, message: "Invalid sender ID." });
        }

        // ✅ Check if receiver exists in Student or Alumni table
        const receiverExists = await Student.findByPk(receiverId) || await Alumni.findByPk(receiverId);
        if (!receiverExists) {
            return res.status(400).json({ success: false, message: "Invalid receiver ID." });
        }

        // ✅ Store message if sender & receiver are valid
        const newMessage = await Message.create({
            senderId,
            receiverId,
            message
        });

        return res.status(201).json({
            success: true,
            message: "Message sent successfully",
            data: newMessage
        });

    } catch (error) {
        console.error("Error sending message:", error);
        return res.status(500).json({ success: false, message: "Internal server error" });
    }
};

const getMessages = async (req, res) => {
    try {
        const { senderId, receiverId } = req.params;

        const messages = await Message.findAll({
            where: {
                [Op.or]: [
                    { senderId, receiverId },
                    { senderId: receiverId, receiverId: senderId }  // ✅ Fetch both sender → receiver & receiver → sender
                ]
            },
            order: [["createdAt", "ASC"]]
        });

        return res.status(200).json({ success: true, data: messages });

    } catch (error) {
        console.error("Error fetching messages:", error);
        return res.status(500).json({ success: false, message: "Internal Server Error" });
    }
};

const getusername = async (req, res) => {
    try {
        const { id } = req.params;

        // Try to find the user in Student table
        const student = await Student.findByPk(id);
        if (student) {
            return res.json({ name: student.name });
        }

        // If not found, try in Alumni table
        const alumni = await Alumni.findByPk(id);
        if (alumni) {
            return res.json({ name: alumni.name });
        }

        return res.status(404).json({ message: "User not found" });
    } catch (error) {
        console.error("Error fetching user name:", error);
        return res.status(500).json({ message: "Internal Server Error" });
    }
};

module.exports = {
    sendMessage,
    getMessages,
    getusername
};

