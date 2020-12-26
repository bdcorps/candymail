
const mailer = require('nodemailer')
const { getConfig } = require('./config.js')

const transporter = mailer.createTransport({
  service: 'gmail',
  auth: {
    user: getConfig.senderEmail,
    pass: getConfig.senderPassword
  }
})

const sendEmail = ({ template, sendFrom, sendTo, subject, body }) => {
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

const generateDateKey = (date) => {
  return date.toLocaleDateString('en-US') + ':' + date.getHours() // 7/21/1983:23
}

module.exports = { sendEmail, generateDateKey }
