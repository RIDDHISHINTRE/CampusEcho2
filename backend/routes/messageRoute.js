const express = require("express");
const { sendMessage, getMessages ,getusername } = require("../controllers/messageController");

const router = express.Router();

router.post("/messages/send", sendMessage);  // Send a message
router.get("/messages/:senderId/:receiverId", getMessages);  // Fetch chat history
router.get("/users/:recieverId" ,getusername)

module.exports = router;
