require('dotenv').config()
// run cron every hour, check the respective entry in emailMap, send email based on properties

const cron = require('node-cron')

const { generateDateKey, sendEmail } = require('./helper')
const { runCandyMailWorkflow, getMessagesAtTime } = require('./builder')

cron.schedule('0 * * * *', () => {
  console.log(`Running cron work at ${(new Date()).getHours}`)
  sendMessagesNow()
})

const sendMessagesNow = () => {
  const today = new Date() // TODO: get data in ETC all the time, this is local time to the machine
  const dateKey = generateDateKey(today)
  console.log('Looking for messages on', dateKey)
  const messagesForThisHour = getMessagesAtTime(dateKey)
  if (messagesForThisHour) { sendEmail(messagesForThisHour[0]) } else { console.log('no messages to send at this time') }
}

const someConditionSatisfiedByUser = () => {
  const user = 'betoko1104@chatdays.com'
  runCandyMailWorkflow('workflow2', user)
}
// sendMessagesNow()
someConditionSatisfiedByUser()
