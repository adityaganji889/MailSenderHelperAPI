const { sendEmail, sendFeedbackReceivedMail } = require('../utils/sendEmail');

const sendPasswordResetLink = async (req, res) => {
  try {
    const user = req.body.user;
    const appType = req.body.appType;
    if (user) {
      const token = await sendEmail(user, "resetpassword", appType);
      if (token) {
        res.send({
          success: true,
          message: `Password reset link sent to your email : ${user.email} successfully.`,
          data: token,
        });
      }
      else {
        res.send({
          success: false,
          message: `App with appType : ${appType} doesn't exists.`,
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

const verifyEmailLink = async (req, res) => {
  try {
    const user = req.body.user;
    const appType = req.body.appType;
    if (user) {
      if (!user.isVerified) {
        const token = await sendEmail(user, "verifyemail", appType);
        if (token) {
          res.send({
            success: true,
            message: `Account verification link sent to your email : ${user.email} successfully`,
            data: token,
          });
        }
        else {
          res.send({
            success: false,
            message: `App with appType : ${appType} doesn't exists.`,
            data: null,
          });
        }
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

const feedbackMail = async(req,res) => {
    try {
    const feedback = req.body.feedback;
    const user = req.body.feedback.user;
    const mailType = req.body.mailType;
    const appType = req.body.appType;
    if (user) {
      const token = await sendFeedbackReceivedMail(user, mailType, appType, feedback);
      if (token) {
        res.send({
          success: true,
          message: `Feedback mail sent to user email : ${user.email} successfully.`,
          data: token,
        });
      }
      else {
        res.send({
          success: false,
          message: `App with appType : ${appType} doesn't exists.`,
          data: null,
        });
      }
    } else {
      res.send({
        success: false,
        message: `Feedback with email : ${user.email} does not exists.`,
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
}

module.exports = { sendPasswordResetLink, verifyEmailLink, feedbackMail };