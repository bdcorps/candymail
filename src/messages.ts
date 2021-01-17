import { Email } from './types/types'

let scheduledMessages: Record<string, Email[]> = {}

const unsubscribedUsers: string[] = []

const addScheduledMessage = (time: string, messageOptions: Email) => {
  if (time in scheduledMessages) {
    scheduledMessages[time] = [...scheduledMessages[time], messageOptions]
  } else {
    scheduledMessages[time] = [messageOptions]
  }
}

const unsubscribeUser = (email: string) => {
  unsubscribedUsers.push(email)
}

const hasUnsubscribed = (email: string) => {
  return unsubscribedUsers.includes(email)
}

const getScheduledMessagesAtTime = (time: string) => {
  return scheduledMessages[time]
}

const getAllScheduledMessages = () => {
  return scheduledMessages
}

const clearAllScheduledMessages = () => {
  scheduledMessages = {}
}

export {
  addScheduledMessage,
  getScheduledMessagesAtTime,
  getAllScheduledMessages,
  clearAllScheduledMessages,
  unsubscribeUser,
  hasUnsubscribed,
}
