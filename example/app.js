const path = require('path')
const candymail = require('../index')

const automationPath = path.resolve('example', 'candymail.automation.json')
candymail.init(automationPath, {
  senderEmail: process.env.MAIL_USER,
  senderPassword: process.env.MAIL_PASSWORD,
  automationPath
})

const someConditionSatisfiedByUser = () => {
  const user1 = 'betoko1104@chatdays.com'
  candymail.runAutomation('automation1', user1)

  const user2 = 'jorie342@highwayeqe.com'
  candymail.runAutomation('automation2', user2)
}

someConditionSatisfiedByUser()
console.log(candymail.getAllScheduledMessages())
