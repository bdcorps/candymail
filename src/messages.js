let scheduledMessages = {}

const addScheduledMessage = (time, messageOptions) => {
  if (time in scheduledMessages) {
    scheduledMessages[time] = [...scheduledMessages[time], messageOptions]
  } else {
    scheduledMessages[time] = [messageOptions]
  }
}

const getScheduledMessagesAtTime = (time) => {
  return scheduledMessages[time]
}

const getAllScheduledMessages = () => {
  return scheduledMessages
}

const clearAllScheduledMessages = () => {
  scheduledMessages = {}
}

module.exports = { addScheduledMessage, getScheduledMessagesAtTime, getAllScheduledMessages, clearAllScheduledMessages }
