const express = require("express");
const { getAllFeedback, deleteFeedback, verifyUser, getUnverifiedUsers ,unverifyUser} = require("../controllers/adminController");
const { authMiddleware, authenticateAdmin } = require("../middlewares/authMiddleware");

const router = express.Router();

// ✅ Ensure authentication before accessing feedback routes
router.get('/feedback', authMiddleware, authenticateAdmin, getAllFeedback);
router.delete('/delete-feedback/:id', authMiddleware, authenticateAdmin, deleteFeedback);

// ✅ Ensure authentication before verifying users
router.post("/verify-user", authMiddleware, authenticateAdmin, verifyUser);
router.get("/unverified-users", authMiddleware, authenticateAdmin, getUnverifiedUsers);
router.delete("/unverify-user", authMiddleware, authenticateAdmin, unverifyUser);

module.exports = router;
