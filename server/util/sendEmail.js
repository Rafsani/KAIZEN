const nodemailer = require("nodemailer");

// async..await is not allowed in global scope, must use a wrapper
const sendEmail = async ( options )=> {

  // create reusable transporter object using the default SMTP transport
  const transporter = nodemailer.createTransport({
    host: "smtp.mailtrap.io",
    port: 2525,
    auth: {
      user: "76610506eaeb83", 
      pass: "22219b1c95798a" 
    },
  });

  const message = {
    from: `Kaizen_Admin <kaizen@gmail.com>`, 
    to: options.email,
    subject: options.subject, 
    text: options.message
  };

  const info = await transporter.sendMail(message)

  console.log("Message sent: %s", info.messageId);
  
}

module.exports = sendEmail