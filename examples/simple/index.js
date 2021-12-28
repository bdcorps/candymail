require('dotenv').config()
const candymail = require('../../lib')
const automation = require('../candymail.automation.json')

candymail
  .init(automation.workflows, {
    mail: {
      host: 'smtp.gmail.com',
      port: 465,
      secure: true,
      auth: {
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASSWORD,
      },
      tls: {
        rejectUnauthorized: true,
      },
    },
    hosting: { url: process.env.HOSTING_URL },
    db: { reset: true },
    debug: { trace: true },
  })
  .then(() => {
    candymail.start()

    // candymail.unsubscribeUser('user@hotmail.com') // Immediatedly unsubscribe user and they will not receive any more messages

    // candymail.sendEmail({
    //   template: 'string',
    //   sendFrom: 'sunnyashiin@gmail.com',
    //   sendTo: 'sunnyashiin@gmail.com',
    //   subject: 'string',
    //   body: 'string',
    // })

    someConditionSatisfiedByUser()
  })

const someConditionSatisfiedByUser = async () => {
  const user = process.env.RECIPIENT_EMAIL
  candymail.runWorkflow('workflow1', user)
}
