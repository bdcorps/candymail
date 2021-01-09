const { isEmpty } = require('lodash')
const path = require('path')
const { setConfig } = require('./config')
const { generateDateKey } = require('./helper')
const {
  addScheduledMessage,
  getAllScheduledMessages,
  getScheduledMessagesAtTime,
  clearAllScheduledMessages,
  unsubscribeUser,
  hasUnsubscribed,
} = require('./messages') // TODO: Clean these propagating imports

let loadedAutomations = {}
// TODO: on init, validate JSON
/**
 * @param  {Object} automationPath
 * @param  {Object} config set sender's email configuration
 * @param  {"Custom"|"126"|"163"|"1und1"|"AOL"|"DebugMail"|"DynectEmail"|"FastMail"|"GandiMail"|"Gmail"|"Godaddy"|"GodaddyAsia"|"GodaddyEurope"|"hot.ee"|"Hotmail"|"iCloud"|"mail.ee"|"Mail.ru"|"Maildev"|"Mailgun"|"Mailjet"|"Mailosaur"|"Mandrill"|"Naver"|"OpenMailBox"|"Outlook365"|"Postmark"|"QQ"|"QQex"|"SendCloud"|"SendGrid"|"SendinBlue"|"SendPulse"|"SES"|"SES-US-EAST-1"|"SES-US-WEST-2"|"SES-EU-WEST-1"|"Sparkpost"|"Yahoo"|"Yandex"|"Zoho"|"qiye.aliyun"} [config.mailService='Gmail'] - Set mailing service to use defaults to gmail
 * @param  {String} config.senderEmail set sender's email in case of supported services or user in case of custom service
 * @param  {String} config.senderPassword set sender's password in case of supported services or user in case of custom service
 * @param  {String} [config.host] - Host for your custom service
 * @param  {Number} [config.port] - Port for your custom service
 * @param  {Boolean} [config.secure ]- Set to true for your custom service if you want a (TLS) secured connection
 */
const init = (automationPath, config) => {
  const automationFile =
    require(automationPath) || path.resolve(process.cwd(), './candymail.automation.json')

  loadedAutomations = loadAutomations(automationFile)
  // TODO: Look for candymail.automation.json in the root path

  setConfig(config)
}

const loadAutomations = (file) => {
  return file.automations
}

const build = (emails, sendTo) => {
  emails.forEach(({ sendDelay, subject, body, from }) => {
    const template = 'default'
    const today = new Date(Date.now())
    today.setHours(today.getHours() + sendDelay) // TODO: problem here. what happens with 10:59 + 1 will be 11
    const time = generateDateKey(today)
    const sendFrom = from

    addScheduledMessage(time, { template, sendFrom, sendTo, subject, body })
  })
}

const runAutomation = (automation, sendTo) => {
  if (!loadedAutomations || isEmpty(loadedAutomations)) {
    throw new Error('No automation configuration found. Run the init first: init()')
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
