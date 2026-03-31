const nodemailer = require("nodemailer");
const bcrypt = require("bcryptjs");
const appModel = require("../models/Apps");

const sendEmail = async (user, mailType, appType, otp) => {
  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      host: "smtp.gmail.com",
      port: 587,
      secure: false,
      auth: {
        user: process.env.SEND_EMAIL,
        pass: process.env.PASS_KEY,
      },
    });
    const salt = await bcrypt.genSalt(10);
    const replaceAll = function (match, replace) {
      return replace(new RegExp(match, 'g'), () => replace);
    }
    let encryptedTokenMain = await bcrypt.hash(user._id.toString(), salt)
    let encryptedToken = "";
    for (var i = 0; i < encryptedTokenMain.length; i++) {
      if (encryptedTokenMain[i] !== '/') {
        encryptedToken += encryptedTokenMain[i];
      }
      else {
        continue;
      }
    }
    // const token = new Token({
    //   userid: user._id,
    //   token: encryptedToken,
    // });
    // await token.save();

    let emailContent, mailOptions;

    let appLink;

    let appAvailable = await appModel.findOne({
      appName: { $regex: `${appType.trim()}$`, $options: "i"}
    });

    if (!appAvailable) {
      return null;
    }
    else {
      appLink = appAvailable.appLinkURL;
    }

    if (mailType == "verifyemail") {
      emailContent = `<div><h1>Please click on the below link to verify your email address</h1> <a href="${appLink}/verifyemail/${encryptedToken}">${encryptedToken}</a>  </div>`;

      mailOptions = {
        from: process.env.SEND_EMAIL,
        to: user.email,
        subject: `Verify Email For ${appType}`,
        html: emailContent,
      };
    } else if(mailType == "resetpassword"){
      emailContent = `<div><h1>Please click on the below link to reset your password</h1> <a href="${appLink}/resetpassword/${encryptedToken}">${encryptedToken}</a>  </div>`;

      mailOptions = {
        from: process.env.SEND_EMAIL,
        to: user.email,
        subject: `Reset password For ${appType}`,
        html: emailContent,
      };
    }
    else if (mailType == "generateOTP") {
      if(user?.subject && user?.text){
         emailContent = `<div>${user.text}</div>`;
         mailOptions = {
          from: process.env.SEND_EMAIL,
          to: user.email,
          subject: user.subject,
          html: emailContent,
         };
      }
      else {
         emailContent = `<div>Your OTP for reset password/verify newly updated email is: ${otp}, will expire in next 10 mins.</div>`;
         mailOptions = {
          from: process.env.SEND_EMAIL,
          to: user.email,
          subject: `Password Reset/Verify Newly Updated Email For ${appType}`,
          html: emailContent,
        };
      }
    }
    else if (mailType == "verifyemailotp") {
      emailContent = `<div>Your OTP to verify email is:${otp}, will expire in next 10 mins.</div>`;
      mailOptions = {
        from: process.env.SEND_EMAIL,
        to: user.email,
        subject: `Verify Email For ${appType}`,
        html: emailContent,
      };
    }

    await transporter.sendMail(mailOptions);

    return encryptedToken; //return token

  } catch (error) {
    console.log(error);
  }
};

const sendFeedbackReceivedMail = async (user, mailType, appType, feedback) => {
  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      host: "smtp.gmail.com",
      port: 587,
      secure: false,
      auth: {
        user: process.env.SEND_EMAIL,
        pass: process.env.PASS_KEY,
      },
      tls: {
        rejectUnauthorized: false
      }
    });

    let emailContent, mailOptions;
    if(!appType){
      return false;
    }
    if (appType == "CDAC Sum of N Numbers Auth") {
      if (mailType == "addFeedback") {
        emailContent = `<div>
      <h4>We've received your feedback for ${feedback.stage.name} : ${feedback.stage.category}</h4>
      <h5>Your feedback received by us was : <br>
      ${feedback.feedback}
      </h5>
      <h5>And the rating you provided to this level was : <br>
      ⭐ ${feedback.rating} out of 5
      </h5>
      <h5>We'll look forward to your suggestions and queries. And inculcate them asap.</h5>
      <h6>
      Thanks & Regards <br>
      From CDAC Sum Of Numbers Team
      </h6>
      </div>`;

        mailOptions = {
          from: process.env.SEND_EMAIL,
          to: user.email,
          subject: `Feedback For ${feedback.stage.name} : ${feedback.stage.category}`,
          html: emailContent,
        };
      }
      else if (mailType == "updateFeedback") {
        emailContent = `<div>
      <h4>We've received your updated feedback for ${feedback.stage.name} : ${feedback.stage.category}</h4>
      <h5>Your updated feedback received by us was : <br>
      ${feedback.feedback}
      </h5>
      <h5>And the updated rating you provided to this level was : <br>
      ⭐ ${feedback.rating} out of 5
      </h5>
      <h5>We'll look forward to your new suggestions and queries. And inculcate them asap.</h5>
      <h6>
      Thanks & Regards <br>
      From CDAC Sum Of Numbers Team
      </h6>
      </div>`;

        mailOptions = {
          from: process.env.SEND_EMAIL,
          to: user.email,
          subject: `Updated Feedback For ${feedback.stage.name} : ${feedback.stage.category}`,
          html: emailContent,
        };
      }
      else if (mailType == "deleteFeedback") {
        emailContent = `<div>
      <h4>Your Feedback for ${feedback.stage.name} : ${feedback.stage.category}</h4>
      <h5>The queries and suggestions you asked for was : <br>
      ${feedback.feedback}
      </h5>
      <h5>were resolved and answered from our side.</h5>
      <h5>We'll look forward to your new suggestions and queries. And inculcate them asap.</h5>
      <h6>
      Thanks & Regards <br>
      From CDAC Sum Of Numbers Team
      </h6>
      </div>`;

        mailOptions = {
          from: process.env.SEND_EMAIL,
          to: feedback.user.email,
          subject: `Updated Feedback For ${feedback.stage.name} : ${feedback.stage.category}`,
          html: emailContent,
        };
      }
    }
    await transporter.sendMail(mailOptions);
    return true;
  } catch (error) {
    console.log(error);
  }
};

module.exports = { sendEmail, sendFeedbackReceivedMail };