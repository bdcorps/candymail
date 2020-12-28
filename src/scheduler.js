const { setConfig } = require('./config')
const { generateDateKey } = require('./helper')
const path = require('path')
const { addScheduledMessage } = require('./messages')

let loadedAutomations = {}
const scheduledMessages = {}

// TODO: on init, validate JSON

const init = (automationPath, config) => {
  const automationFile = require(automationPath) || path.resolve(process.cwd(), './candymail.automation.json')

  loadedAutomations = loadAutomations(automationFile)

  // TODO: Look for candymail.automation.json in the root path

  setConfig(config)
}

const loadAutomations = (file) => {
  return file.automations
}

const build = (emails, sendTo) => {
  emails.forEach(({ trigger, sendDelay, subject, body, from }) => {
    const template = 'default'
    const today = new Date()
    today.setHours(today.getHours() + sendDelay) // TDDO: problem here. what happens with 10:59 + 1 will be 11
    const time = generateDateKey(today)
    const sendFrom = from

    addScheduledMessage(time, { template, sendFrom, sendTo, subject, body })
  })
}

const runAutomation = (automation, sendTo) => {
  if (!loadedAutomations) { throw new Error('No automation configuration found. Run the init first: init()') }
  const messagesInAutomation = loadedAutomations.find(message => message.name === automation)
  build(messagesInAutomation.emails, sendTo)
}

const getScheduledMessagesAtTime = (time) => {
  return scheduledMessages[time]
}

const getAllScheduledMessages = () => {
  return scheduledMessages
}

module.exports = { init, runAutomation, addScheduledMessage, getAllScheduledMessages, getScheduledMessagesAtTime }
