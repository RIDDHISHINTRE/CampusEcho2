const { Op } = require("sequelize");
const Message = require("../models/Message");
const Student = require("../models/studentModel");
const Alumni = require("../models/Alumni");
const transporter = require("../config/nodemailerConfig"); // ✅ Import existing transporter

// ✅ Fetch unseen messages for a user
const getUnseenMessages = async (req, res) => {
    try {
        const { userId } = req.params;

        const unseenMessages = await Message.findAll({
            where: {
                receiverId: userId,
                isRead: false
            },
            order: [["createdAt", "DESC"]]
        });

        const messagesWithSenderNames = [];

        for (const msg of unseenMessages) {
            const { senderId } = msg;

            let sender = await Student.findByPk(senderId);
            if (!sender) {
                sender = await Alumni.findByPk(senderId);
            }

            messagesWithSenderNames.push({
                id: msg.id,
                senderId,
                receiverId: msg.receiverId,
                message: msg.message,
                isRead: msg.isRead,
                createdAt: msg.createdAt,
                senderName: sender?.name || "Unknown"
            });
        }

        return res.status(200).json({ success: true, data: messagesWithSenderNames });
    } catch (error) {
        console.error("Error fetching unseen messages:", error);
        return res.status(500).json({ success: false, message: "Internal Server Error" });
    }
};

// ✅ Notify alumni via email if they have more than 4-5 unseen messages
const notifyAlumni = async () => {
    try {
        const alumniList = await Alumni.findAll();

        for (const alumni of alumniList) {
            const unseenMessages = await Message.findAll({
                where: { receiverId: alumni.id, isRead: false }
            });

            if (unseenMessages.length >= 5) {
                await transporter.sendMail({
                    from: process.env.EMAIL_USER,
                    to: alumni.email,
                    subject: "New Messages Notification",
                    text: `You have ${unseenMessages.length} unread messages from students. Please check your inbox.`,
                });

                console.log(`📧 Email sent to ${alumni.email} about ${unseenMessages.length} unseen messages.`);
            }
        }
    } catch (error) {
        console.error("Error sending alumni email notifications:", error);
    }
};

// ✅ Mark messages as read when viewed
const markMessagesAsRead = async (req, res) => {
    try {
        const { userId } = req.params;

        await Message.update({ isRead: true }, {
            where: { receiverId: userId, isRead: false }
        });

        return res.status(200).json({ success: true, message: "Messages marked as read" });
    } catch (error) {
        console.error("Error marking messages as read:", error);
        return res.status(500).json({ success: false, message: "Internal Server Error" });
    }
};

const getRecentUnrepliedMessages = async (req, res) => {
    try {
        const { userId } = req.params;
        const twoDaysAgo = new Date();
        twoDaysAgo.setDate(twoDaysAgo.getDate() - 2);

        // Step 1: Get all messages received in the last 2 days
        const recentMessages = await Message.findAll({
            where: {
                receiverId: userId,
                createdAt: { [Op.gte]: twoDaysAgo }
            },
            order: [["createdAt", "DESC"]]
        });

        // Step 2: Group by senderId and filter out senders who already got a reply
        const senderMap = new Map();

        for (const msg of recentMessages) {
            if (!senderMap.has(msg.senderId)) {
                senderMap.set(msg.senderId, msg);
            }
        }

        const unrepliedSenders = [];

        for (const [senderId, msg] of senderMap) {
            const replyExists = await Message.findOne({
                where: {
                    senderId: userId,
                    receiverId: senderId,
                    createdAt: { [Op.gte]: new Date(msg.createdAt) }
                }
            });

            if (!replyExists) {
                let sender = await Student.findByPk(senderId);
                if (!sender) {
                    sender = await Alumni.findByPk(senderId);
                }

                unrepliedSenders.push({
                    id: msg.id,
                    senderId,
                    senderName: sender?.name || "Unknown",
                    receiverId: msg.receiverId,
                    message: msg.message,
                    createdAt: msg.createdAt
                });
            }
        }

        return res.status(200).json({ success: true, data: unrepliedSenders });
    } catch (error) {
        console.error("Error fetching recent unreplied messages:", error);
        return res.status(500).json({ success: false, message: "Internal Server Error" });
    }
};


module.exports = { getUnseenMessages, notifyAlumni, markMessagesAsRead ,getRecentUnrepliedMessages };