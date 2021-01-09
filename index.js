require('dotenv').config()
// run cron every hour, check the respective entry in emailMap, send email based on properties

const cron = require('node-cron')

const { generateDateKey, sendEmail } = require('./src/helper')
const {
  init,
  runAutomation,
  getAllScheduledMessages,
  getScheduledMessagesAtTime,
  clearAllScheduledMessages,
  unsubscribeUser,
} = require('./src/scheduler')

// scheduler runs automatically on import
const task = cron.schedule(
  '0 * * * *',
  () => {
    sendMessagesNow()
  },
  {
    scheduled: false,
  }
)

const start = () => {
  task.start()
}

const stop = () => {
  task.stop()
}

const destroy = () => {
  task.destroy()
}

const sendMessagesNow = () => {
  const dateKey = generateDateKey()
  const messagesForThisHour = getScheduledMessagesAtTime(dateKey)

  if (messagesForThisHour) {
    messagesForThisHour.forEach((message) => {
      sendEmail(message)
    })
  }
}

module.exports = {
  init,
  start,
  stop,
  destroy,
  runAutomation,
  getAllScheduledMessages,
  getScheduledMessagesAtTime,
  clearAllScheduledMessages,
  sendMessagesNow,
  unsubscribeUser,
}
