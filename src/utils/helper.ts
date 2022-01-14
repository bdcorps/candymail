import { MessageRow } from '../types'

import { getConfig, getTransporter } from '../config'
import { setEmailSent } from '../db'

const sendEmail = (message: MessageRow) => {
  const {
    id,
    email: { sendFrom, sendTo, subject, body },
  } = message

  const transporter = getTransporter()

  const html = `${body}<br><a href="${getConfig().hosting.url
    }/unsubscribe?email=${sendTo}">Click here to unsubscribe</a>`

  const mailOptions = {
    from: sendFrom,
    to: sendTo,
    subject,
    html,
  }

  transporter.sendMail(mailOptions, async (err: any, info: any) => {
    if (err) {
      throw err
    }

    await setEmailSent(id)
  })
}

export { sendEmail }
