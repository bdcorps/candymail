require('dotenv').config()
const candymail = require('../../lib')
const express = require('express')
const app = express()
const port = 3000

const automations = require('../candymail.automation.json')
candymail.init(automations.automations, {
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
})

candymail.start()

app.get('/', (req, res) => {
  const user = process.env.RECIPIENT_EMAIL
  candymail.runAutomation('automation1', user)

  res.send(
    `Welcome to Candymail Demo. Messages scheduled: ${JSON.stringify(
      candymail.getAllScheduledMessages()
    )} `
  )
})

app.get('/unsubscribe', (req, res) => {
  const { email } = req.query
  candymail.unsubscribeUser(email)
  res.send(`Sent a unsubscribe request for ${email}`)
})

app.listen(port, () => {
  console.log(`Learn about our new features at http://localhost:${port}`)
})
