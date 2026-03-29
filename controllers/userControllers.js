const sendEmail = require('../utils/sendEmail');

const sendPasswordResetLink = async (req, res) => {
  try {
    const user = req.body.user;
    const appType = req.body.appType;
    if (user) {
      await sendEmail(user, "resetpassword", appType);
      res.send({
        success: true,
        message: `Password reset link sent to your email : ${user.email} successfully.`,
        data: null,
      });
    } else {
      res.send({
        success: false,
        message: `Account with email : ${user.email} does not exists.`,
        data: null,
      });
    }
  } catch (error) {
    res.status(400).send({
      success: false,
      data: error,
      message: error.message,
    });
  }
};

const verifyEmailLink = async (req, res) => {
  try {
    const user = req.body.user;
    const appType = req.body.appType;
    if (user) {
      if (!user.isVerified) {
        await sendEmail(user, "verifyemail",appType);
        res.send({
          success: true,
          message: `Account verification link sent to your email : ${user.email} successfully`,
          data: null,
        });
      } else {
        res.send({
          success: false,
          message: `Account with email : ${user.email} is already verified.`,
          data: null,
        });
      }
    } else {
      res.send({
        success: false,
        message: `Account with email : ${user.email} does not exists.`,
        data: null,
      });
    }
  } catch (error) {
    res.status(400).send({
      success: false,
      data: error,
      message: error.message,
    });
  }
};

module.exports = {sendPasswordResetLink, verifyEmailLink};