let scheduledMessages = {}
const unsubscribedUsers = []

const addScheduledMessage = (time, messageOptions) => {
  if (time in scheduledMessages) {
    scheduledMessages[time] = [...scheduledMessages[time], messageOptions]
  } else {
    scheduledMessages[time] = [messageOptions]
  }
}

const unsubscribeUser = (email) => {
  unsubscribedUsers.push(email)
}

const hasUnsubscribed = (email) => {
  return unsubscribedUsers.includes(email)
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

module.exports = {
  addScheduledMessage,
  getScheduledMessagesAtTime,
  getAllScheduledMessages,
  clearAllScheduledMessages,
  unsubscribeUser,
  hasUnsubscribed,
}
