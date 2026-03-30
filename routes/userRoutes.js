const router = require("express").Router();
const {sendPasswordResetLink, verifyEmailLink, feedbackMail, generateOTPVerifyMail} = require("../controllers/userControllers");

router.post("/sendPasswordResetLink",sendPasswordResetLink);
router.post("/verifyEmailLink",verifyEmailLink);
router.post("/feedbackMail",feedbackMail);
router.post("/generateOTPVerifyMail",generateOTPVerifyMail);

module.exports = router;