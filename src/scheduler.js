const path = require("path")
const { setConfig } = require("./config")
const { generateDateKey } = require("./helper")
const {
  addScheduledMessage,
  getAllScheduledMessages,
  getScheduledMessagesAtTime,
  clearAllScheduledMessages,
  unsubscribeUser,
  hasUnsubscribed,
} = require("./messages") // TODO Clean these propagating imports

let loadedAutomations = {}

// TODO: on init, validate JSON

const init = (automationPath, config) => {
  const automationFile =
    require(automationPath) || path.resolve(process.cwd(), "./candymail.automation.json")

  loadedAutomations = loadAutomations(automationFile)
  // TODO: Look for candymail.automation.json in the root path

  setConfig(config)
}

const loadAutomations = (file) => {
  return file.automations
}

const build = (emails, sendTo) => {
  emails.forEach(({ trigger, sendDelay, subject, body, from }) => {
    const template = "default"
    const today = new Date(Date.now())
    today.setHours(today.getHours() + sendDelay) // TDDO: problem here. what happens with 10:59 + 1 will be 11
    const time = generateDateKey(today)
    const sendFrom = from

    addScheduledMessage(time, { template, sendFrom, sendTo, subject, body })
  })
}

const runAutomation = (automation, sendTo) => {
  if (!loadedAutomations) {
    throw new Error("No automation configuration found. Run the init first: init()")
  }
  const messagesInAutomation = loadedAutomations.find((message) => message.name === automation)
  build(messagesInAutomation.emails, sendTo)
}

module.exports = {
  init,
  runAutomation,
  addScheduledMessage,
  getAllScheduledMessages,
  getScheduledMessagesAtTime,
  clearAllScheduledMessages,
  unsubscribeUser,
  hasUnsubscribed,
}
