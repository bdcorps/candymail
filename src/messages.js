const scheduledMessages = {}

const addScheduledMessage = (time, messageOptions) => {
  if (time in scheduledMessages) {
    scheduledMessages[time] = [...scheduledMessages[time], messageOptions]
  } else {
    scheduledMessages[time] = [messageOptions]
  }
}

module.exports = { addScheduledMessage }
