const router = require("express").Router();
const {sendPasswordResetLink, verifyEmailLink, feedbackMail, generateOTPVerifyMail} = require("../controllers/userControllers");


/**
 * @swagger
 * components:
 *   schemas:
 *     UserInfo:
 *       type: object
 *       required:
 *         - user
 *         - mailType
 *         - appType
 *       properties:
 *         user:
 *           type: object
 *           required:
 *             - _id
 *             - email
 *           properties:
 *             _id:
 *               type: string
 *               description: Registered User Id
 *             email:
 *               type: string
 *               description: Registered User Email
 *             isVerified:
 *               type: boolean
 *               description: Tells whether user is verified or not
 *             text:
 *               type: string
 *               description: Text to be sent in mail to user requesting OTP
 *             subject:
 *               type: string
 *               description: Subject to be sent in mail to user requesting OTP             
 *         mailType: 
 *           type: string
 *           enum: ['verifyemail','resetpassword','generateOTP','verifyemailotp','addFeedback','updateFeedback','deleteFeedback']
 *           description: Specifies the kind and subject of mail to be sent to requesting user
 *         appType:
 *           type: string
 *           description: Specifies the registered app to which the mail to be sent to requesting user
 *         otp:
 *           type: string
 *           description: User's registered app sends OTP in this to verify further
 */

/**
 * @swagger
 * tags:
 *   name: UserInfo
 *   description: REST API For UserInfo
 * /api/users/sendPasswordResetLink:
 *   post:
 *     tags: [UserInfo]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UserInfo'
 *     description: Send Password Reset Link API
 *     responses:
 *       200:
 *         description: Password Reset Link is sent successfully to requesting user
 *       500:
 *         description: Internal Server Error
 */
router.post("/sendPasswordResetLink",sendPasswordResetLink);

/**
 * @swagger
 * tags:
 *   name: UserInfo
 *   description: REST API For UserInfo
 * /api/users/verifyEmailLink:
 *   post:
 *     tags: [UserInfo]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UserInfo'
 *     description: Verify Email Link API
 *     responses:
 *       200:
 *         description: Verify Email Link is sent successfully to requesting user
 *       500:
 *         description: Internal Server Error
 */
router.post("/verifyEmailLink",verifyEmailLink);

/**
 * @swagger
 * tags:
 *   name: UserInfo
 *   description: REST API For UserInfo
 * /api/users/feedbackMail:
 *   post:
 *     tags: [UserInfo]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UserInfo'
 *     description: Feedback Received Confirmation Email API
 *     responses:
 *       200:
 *         description: Feedback Received Confirmation is sent successfully to requesting user
 *       500:
 *         description: Internal Server Error
 */
router.post("/feedbackMail",feedbackMail);

/**
 * @swagger
 * tags:
 *   name: UserInfo
 *   description: REST API For UserInfo
 * /api/users/generateOTPVerifyMail:
 *   post:
 *     tags: [UserInfo]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UserInfo'
 *     description: Generate OTP/Verify Email Link API
 *     responses:
 *       200:
 *         description: OTP Generated/Verify Email Link is sent successfully to requesting user
 *       500:
 *         description: Internal Server Error
 */
router.post("/generateOTPVerifyMail",generateOTPVerifyMail);

module.exports = router;