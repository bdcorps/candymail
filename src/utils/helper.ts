import { MessageRow } from '../types'

import * as mailer from 'nodemailer'
import { getConfig, getTransporter } from '../config'
import { hasUnsubscribed } from '../unsubscribe'
import { setEmailSent } from '../db'

const sendEmail = (message: MessageRow) => {
  const { id, email: { template, sendFrom, sendTo, subject, body } } = message
  if (hasUnsubscribed(sendTo)) {
    throw new Error(
      `The user ${sendTo} you are trying to send a message to has already unsubscribed`
    )
  }

  const transporter = getTransporter()

  const html = `${body}<br><a href="${getConfig().hosting.url
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

    setEmailSent(id)
  })
}


export { sendEmail }
