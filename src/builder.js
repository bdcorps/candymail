const { generateDateKey } = require('./helper')

let messagesJSON = {}
const messages = {}

// TODO: on init, validate JSON

const init = (workflowPath) => {
  messagesJSON = require(workflowPath)
  //TODO: Look for candymail.workflow.json in the root path
}

const build = (emails, sendTo) => {
  emails.forEach(({ trigger, sendDelay, subject, body, from }) => {
    const template = 'default'
    const today = new Date()
    today.setHours(today.getHours() + sendDelay) // TDDO: problem here. what happens with 10:59 + 1 will be 11
    const time = generateDateKey(today)
    const sendFrom = from

    addMessage(time, { template, sendFrom, sendTo, subject, body })
  })
}

const runWorkflow = (workflow, sendTo) => {
  if (!messagesJSON) { throw new Error('No workflow configuration found. Run the init first: init()') }
  const messagesInWorkflow = messagesJSON.workflows.find(message => message.name === workflow)
  build(messagesInWorkflow.emails, sendTo)
}

const addMessage = (time, messageOptions) => {
  if (time in messages) {
    messages[time] = [...messages[time], messageOptions]
  } else {
    messages[time] = [messageOptions]
  }
}

const getMessagesAtTime = (time) => {
  return messages[time]
}

const getAllMessages = () => {
  return messages
}

module.exports = { init, runWorkflow, addMessage, getAllMessages, getMessagesAtTime }
