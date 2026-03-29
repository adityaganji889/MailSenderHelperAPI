const router = require("express").Router();
const {sendPasswordResetLink, verifyEmailLink} = require("../controllers/userControllers");

router.post("/sendPasswordResetLink",sendPasswordResetLink);
router.post("/verifyEmailLink",verifyEmailLink);

module.exports = router;