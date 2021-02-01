import { Email } from './types/types'

import * as mailer from 'nodemailer'
import { getMailerConfig, getTransporter } from './config'
import { hasUnsubscribed } from './messages'

const sendEmail = (email: Email) => {
  const { template, sendFrom, sendTo, subject, body } = email
  if (hasUnsubscribed(sendTo)) {
    throw new Error(
      `The user ${sendTo} you are trying to send a message to has already unsubscribed`
    )
  }

  const transporter = getTransporter();

  const html = `${body}<br><a href="${getMailerConfig().hosting.url
    }/unsubscribe?email=${sendTo}">Click here to unsubscribe</a>`

  const mailOptions = {
    from: sendFrom,
    to: sendTo,
    subject,
    html,
  }
  transporter.sendMail(mailOptions, (err: any, info: any) => {
    if (err) {
      throw err
    }
  })
}

const generateDateKey = (today: Date) => {
  const date = today || new Date(Date.now())
  return date.toLocaleDateString('en-US', { timeZone: 'UTC' }) + ':' + date.getUTCHours() // 7/21/1983:23
}

export { sendEmail, generateDateKey }
