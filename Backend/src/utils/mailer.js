const nodemailer = require('nodemailer');
const config = require('../core/config');

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: config.emailUser,
    pass: config.emailPass,
  },
});

const sendEmail = async (to, subject, html) => {
  await transporter.sendMail({
    from: config.emailUser,
    to,
    subject,
    html
  });
};

module.exports = { sendEmail };
