
const mailer = require('nodemailer')
const { getConfig } = require('./config.js')

const sendEmail = ({ template, sendFrom, sendTo, subject, body }) => {
  const transporter = mailer.createTransport({
    service: 'gmail',
    auth: {
      user: getConfig().senderEmail,
      pass: getConfig().senderPassword
    }
  })

  const mailOptions = {
    from: sendFrom,
    to: sendTo,
    subject,
    html: body
  }
  transporter.sendMail(mailOptions, function (err, info) {
    if (err) {
      console.log(err)
    } else {
      console.log(info)
    }
  })
}

const generateDateKey = () => {
  const today = new Date(Date.now())
  return today.toLocaleDateString('en-US') + ':' + today.getHours() // 7/21/1983:23
}

module.exports = { sendEmail, generateDateKey }
