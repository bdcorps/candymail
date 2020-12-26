const path = require('path')
const { init, runWorkflow, getAllMessages, getMessagesAtTime } = require('../index')

const workflowPath = path.resolve('example', 'candymail.workflow.json')
init(workflowPath, {
  senderEmail: process.env.MAIL_USER,
  senderPassword: process.env.MAIL_PASSWORD,
  workflowPath
})

const someConditionSatisfiedByUser = () => {
  const user1 = 'betoko1104@chatdays.com'
  runWorkflow('workflow1', user1)

  const user2 = 'jorie342@highwayeqe.com'
  runWorkflow('workflow2', user2)
}

someConditionSatisfiedByUser()
console.log(getAllMessages())
