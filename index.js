require('dotenv').config()
// run cron every hour, check the respective entry in emailMap, send email based on properties

const cron = require('node-cron')

const { generateDateKey, sendEmail } = require('./src/helper')
const { init, runAutomation, getAllScheduledMessages, getScheduledMessagesAtTime } = require('./src/scheduler')

// scheduler runs automatically on import
// cron.schedule('0 * * * *', () => {
//   console.log(`Running cron work at ${(new Date()).getHours}`)
//   const today = new Date() // TODO: get data in ETC all the time, this is local time to the machine
//   const dateKey = generateDateKey(today)
//   console.log('Looking for messages on', dateKey)
//   sendMessagesNow(dateKey)
// })

const sendMessagesNow = (dateKey) => {
  // console.log('d')
  const messagesForThisHour = getScheduledMessagesAtTime(dateKey)

  console.log('messagesForThisHour', messagesForThisHour)

  if (messagesForThisHour) {
    console.log('sending mail')
    messagesForThisHour.forEach(message => {
      sendEmail(message)
    })
  } else { console.log('no messages to send at this time') }
}

module.exports = { init, runAutomation, getAllScheduledMessages, getScheduledMessagesAtTime, sendMessagesNow }
