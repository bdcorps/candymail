
const mailer = require('nodemailer')

const transporter = mailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.MAIL_USER,
    pass: process.env.MAIL_PASSWORD
  }
})

const sendEmail = ({ template, sendFrom, sendTo, subject, body }) => {
  const mailOptions = {
    from: process.env.MAIL_USER,
    to: sendTo || process.env.MAIL_USER,
    subject: subject || 'Meeting Reminder',
    html: body || '<p>hi your meeting in just 15 min</p>'
  }
  transporter.sendMail(mailOptions, function (err, info) {
    if (err) {
      console.log(err)
    } else {
      console.log(info)
    }
  })
}

module.exports = { sendEmail }
