require('dotenv').config()
// run cron every hour, check the respective entry in emailMap, send email based on properties

const cron = require('node-cron')

const { generateDateKey, sendEmail } = require('./src/helper')
const { init, runWorkflow, getAllMessages, getMessagesAtTime } = require('./src/builder')

// scheduler runs automatically on import
cron.schedule('0 * * * *', () => {
  console.log(`Running cron work at ${(new Date()).getHours}`)
  sendMessagesNow()
})

const sendMessagesNow = () => {
  const today = new Date() // TODO: get data in ETC all the time, this is local time to the machine
  const dateKey = generateDateKey(today)
  console.log('Looking for messages on', dateKey)
  const messagesForThisHour = getMessagesAtTime(dateKey)
  if (messagesForThisHour) {
    messagesForThisHour.forEach(message => {
      sendEmail(message)
    })
  } else { console.log('no messages to send at this time') }
}

module.exports = { init, runWorkflow, getAllMessages, getMessagesAtTime }
