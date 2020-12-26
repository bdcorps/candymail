require('dotenv').config()
// run cron every hour, check the respective entry in emailMap, send email based on properties

const cron = require('node-cron')

const { sendEmail } = require('./helper')
const { addMessage, getMessagesAtTime } = require('./builder')

cron.schedule('0 * * * *', () => {
  console.log(`Running cron work at ${(new Date()).getHours}`)
  sendMessagesNow()
})

const sendMessagesNow = () => {
  const today = new Date() // TODO: get data in ETC all the time, this is local time to the machine
  const currentHour = today.getHours()
  const messagesForThisHour = getMessagesAtTime(currentHour)
  if (messagesForThisHour) { sendEmail(messagesForThisHour) } else { console.log('no messages to send at this time') }
}

// for part 2 -> decoding the candymail.wordkflow.json
// addMessage(12, { template: '', sendFrom: 'sunnyashiin@gmail.com', sendTo: 'sunnyashiin@gmail.com', subject: 'first email', body: 'body!' })
// sendEmail(emailMap[1])

sendMessagesNow()
