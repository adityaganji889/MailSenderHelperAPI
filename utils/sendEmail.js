const nodemailer = require("nodemailer");
const bcrypt = require("bcryptjs");
const appModel = require("../models/Apps");

module.exports = async (user, mailType, appType) => {
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
    const replaceAll = function(match, replace) {
           return replace(new RegExp(match, 'g'), () => replace);
    }
    let encryptedTokenMain = await bcrypt.hash(user._id.toString(),salt)
    let encryptedToken = "";
    for (var i=0; i<encryptedTokenMain.length; i++){
        if(encryptedTokenMain[i]!=='/'){
            encryptedToken+=encryptedTokenMain[i];
        }
        else{
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
      appName: appType
    });

    if(!appAvailable){
        return null;
    }
    else{
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
    } else {
      emailContent = `<div><h1>Please click on the below link to reset your password</h1> <a href="${appLink}/resetpassword/${encryptedToken}">${encryptedToken}</a>  </div>`;

      mailOptions = {
        from: process.env.SEND_EMAIL,
        to: user.email,
        subject: `Reset password For ${appType}`,
        html: emailContent,
      };
    }

    await transporter.sendMail(mailOptions);
    
    return encryptedToken; //return token

  } catch (error) {
    console.log(error);
  }
};