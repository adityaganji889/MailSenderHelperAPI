const router = require("express").Router();
const {sendPasswordResetLink, verifyEmailLink, feedbackMail} = require("../controllers/userControllers");

router.post("/sendPasswordResetLink",sendPasswordResetLink);
router.post("/verifyEmailLink",verifyEmailLink);
router.post("/feedbackMail",feedbackMail);

module.exports = router;