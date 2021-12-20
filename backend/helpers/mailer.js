const nodemailer = require('nodemailer');

async function sendMail(email, link) {
  console.log(email);
  console.log(link);

  // create reusable transporter object using the default SMTP transport
  let transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
      user: 'ersatzavient@gmail.com',
      pass: 'bum-fuzzle',
    },
  });

  // send mail with defined transport object
  let info = await transporter.sendMail({
    to: email, // list of receivers
    subject: 'Account Activation Link', // Subject line
    text: 'Hello world?', // plain text body
    html: 'Please click <a href="' + link + '"> here </a> to activate your account.', // html body
  });

  transporter.sendMail(info, function (err, res) {
    if (err) {
      console.log(err);
    } else {
      console.log(res);
    }
  });

  // console.log('Message sent: %s', info.messageId);
}

module.exports = sendMail;
