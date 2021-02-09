import { Email } from './types/types'

let scheduledMessages: Record<string, Email[]> = {}

const addScheduledMessage = (time: string, messageOptions: Email) => {
  if (time in scheduledMessages) {
    scheduledMessages[time] = [...scheduledMessages[time], messageOptions]
  } else {
    scheduledMessages[time] = [messageOptions]
  }
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
  clearAllScheduledMessages
}
