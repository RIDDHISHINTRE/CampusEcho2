const express = require("express");
const {submitFeedback ,getAllFeedback }=require("../controllers/feedbackcontroller");


const router = express.Router();

router.post("/feedback-post", submitFeedback);

router.get("/get-feedback",  getAllFeedback);

module.exports =router;