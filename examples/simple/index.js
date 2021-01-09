const path = require('path')
const candymail = require('../../index')

const automationPath = path.resolve('examples', 'candymail.automation.json')

candymail.init(automationPath, {
  senderEmail: process.env.MAIL_USER,
  senderPassword: process.env.MAIL_PASSWORD,
  hostingURL: 'http://localhost:3000',
})

candymail.start()

// candymail.unsubscribeUser('user@hotmail.com') // Immediatedly unsubscribe user and they will not receive any more messages

const someConditionSatisfiedByUser = () => {
  const user = 'mewice9875@chomagor.com'
  candymail.runAutomation('automation1', user)
}

someConditionSatisfiedByUser()
