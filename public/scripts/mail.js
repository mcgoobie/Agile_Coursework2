const nodemailer = require('nodemailer');

function sendEmail() {
  var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'owenleeweihern@gmail.com',
      pass: 'Weihern207$'
    }
  });

  var mailOptions = {
    from: 'owenleeweihern@gmail.com',
    to: 'ogawmogaw@gmail.com',
    subject: 'Sending Email using Node.js',
    text: 'That was easy!'
  };

  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log(error);
    } else {
      console.log('Email sent: ' + info.response);
    }
  });
}