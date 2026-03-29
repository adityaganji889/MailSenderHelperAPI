const router = require("express").Router();
const {sendPasswordResetLink, verifyEmailLink} = require("../controllers/userControllers");

router.post("/sendPasswordResetLink",sendPasswordResetLink);
router.post("/verifyEmailLinkV2",verifyEmailLink);

module.exports = router;