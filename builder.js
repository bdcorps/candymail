const messagesJSON = require('./candymail.workflow.json')
const { generateDateKey } = require('./helper')

const messages = {}

// TODO: on init, validate JSON

const buildCandyMail = (emails, sendTo) => {
  emails.forEach(({ trigger, sendDelay, subject, body, from }) => {
    const template = 'default'
    const today = new Date()
    today.setHours(today.getHours() + sendDelay) // TDDO: problem here. what happens with 10:59 + 1 will be 11
    const time = generateDateKey(today)
    const sendFrom = from

    addMessage(time, { template, sendFrom, sendTo, subject, body })
  })
}

const runCandyMailWorkflow = (workflow, sendTo) => {
  const messagesInWorkflow = messagesJSON.workflows.find(message => message.name === workflow)
  buildCandyMail(messagesInWorkflow.emails, sendTo)
  console.log('runCandyMailWorkflow', messages)
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

module.exports = { runCandyMailWorkflow, addMessage, getMessagesAtTime }
