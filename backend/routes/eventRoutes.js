const express = require("express");
const { getUpcomingEvents, createEvent, deleteEvent,getAllEvents ,getEventById} = require("../controllers/eventController");
const { authMiddleware } = require("../middlewares/authMiddleware");

const router = express.Router();

router.get("/", getUpcomingEvents);
router.get("/all", getAllEvents);
router.get('/:id',getEventById);
router.post("/" ,authMiddleware ,createEvent);
router.delete("/:id", authMiddleware ,deleteEvent);


module.exports = router;