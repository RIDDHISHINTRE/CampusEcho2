const express = require("express");
const { getUnseenMessages, markMessagesAsRead ,getRecentUnrepliedMessages } = require("../controllers/notificationController");

const router = express.Router();

router.get("/notifications/:userId", getUnseenMessages); // Fetch unseen messages
router.put("/notifications/mark-as-read/:userId", markMessagesAsRead); // Mark as read
router.get("/notifications/unreplied/:userId", getRecentUnrepliedMessages);

module.exports = router;