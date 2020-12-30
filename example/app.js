const path = require('path')
const candymail = require('../index')

const automationPath = path.resolve('example', 'candymail.automation.json')

candymail.init(automationPath, {
  senderEmail: process.env.MAIL_USER,
  senderPassword: process.env.MAIL_PASSWORD
})

candymail.start()

const someConditionSatisfiedByUser = () => {
  const user1 = 'user1@gmail.com'
  candymail.runAutomation('automation1', user1)

  const user2 = 'user2@hotmail.com'
  candymail.runAutomation('automation2', user2)
}

someConditionSatisfiedByUser()
console.log(candymail.getAllScheduledMessages())
