const path = require('path')
const { init, runWorkflow, getAllMessages, getMessagesAtTime } = require('../index')

const workflowFile = path.resolve('example', 'candymail.workflow.json')
init(workflowFile)

const someConditionSatisfiedByUser = () => {
  const user1 = 'betoko1104@chatdays.com'
  runWorkflow('workflow1', user1)

  const user2 = 'jorie342@highwayeqe.com'
  runWorkflow('workflow2', user2)
}

someConditionSatisfiedByUser()
console.log(getAllMessages())
