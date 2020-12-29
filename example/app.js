const path = require('path')
const candymail = require('../index')

const automationPath = path.resolve('example', 'candymail.automation.json')

candymail.init(automationPath, {
  senderEmail: process.env.MAIL_USER,
  senderPassword: process.env.MAIL_PASSWORD
})

candymail.start()

const someConditionSatisfiedByUser = () => {
  const user1 = 'howivey729@chatdays.com'
  candymail.runAutomation('automation2', user1)

  const user2 = 'cobwuc@mailpoof.com'
  candymail.runAutomation('automation1', user2)
}

someConditionSatisfiedByUser()
console.log(candymail.getAllScheduledMessages())