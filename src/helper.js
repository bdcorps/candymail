const mailer = require('nodemailer')
const { getConfig } = require('./config.js')
const { hasUnsubscribed } = require('./messages')

const sendEmail = ({ template, sendFrom, sendTo, subject, body }) => {
  console.log('sending email', sendTo, 'is here and it is ', hasUnsubscribed(sendTo))
  if (hasUnsubscribed(sendTo)) {
    throw new Error(
      `The user ${sendTo} you are trying to send a message to has already unsubscribed`
    )
  }

  const transporter = mailer.createTransport({
    service: 'gmail',
    auth: {
      user: getConfig().senderEmail || process.env.MAIL_USER,
      pass: getConfig().senderPassword || process.env.MAIL_PASSWORD,
    },
  })

  console.log('hosting is on ', getConfig().hostingURL)
  const html = `<p>${body}</p><br><a href="${
    getConfig().hostingURL
  }/unsubscribe?email=${sendTo}">Click here to unsubscribe</a>`

  const mailOptions = {
    from: sendFrom,
    to: sendTo,
    subject,
    html,
  }
  transporter.sendMail(mailOptions, function (err, info) {
    if (err) {
      console.log(err)
    } else {
      console.log(info)
    }
  })
}

const generateDateKey = (today) => {
  const date = today || new Date(Date.now())
  console.log('actual date', date)
  return date.toLocaleDateString('en-US', { timeZone: 'UTC' }) + ':' + date.getUTCHours() // 7/21/1983:23
}

const getUTCDate = () => {
  var now = new Date(Date.now())
  var utc_timestamp = Date.UTC(
    now.getUTCFullYear(),
    now.getUTCMonth(),
    now.getUTCDate(),
    now.getUTCHours(),
    now.getUTCMinutes(),
    now.getUTCSeconds(),
    now.getUTCMilliseconds()
  )
  return utc_timestamp
}

module.exports = { sendEmail, generateDateKey }
