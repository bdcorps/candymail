import { Email } from './types/types'
import { addEmailRow, getEmailRows, getAllEmailRows } from "./db"

let scheduledMessages: Record<string, Email[]> = {}

const addScheduledMessage = (time: string, messageOptions: Email) => {
  // if (time in scheduledMessages) {
  //   scheduledMessages[time] = [...scheduledMessages[time], messageOptions]
  // } else {
  //   scheduledMessages[time] = [messageOptions]
  // }
  addEmailRow(time, messageOptions)
}

const getScheduledMessagesAtTime = (time: string) => {
  return getEmailRows(time)
}

const getAllScheduledMessages = () => {
  return getAllEmailRows()
}

const clearAllScheduledMessages = () => {
  scheduledMessages = {}
}

export {
  addScheduledMessage,
  getScheduledMessagesAtTime,
  getAllScheduledMessages,
  clearAllScheduledMessages,
}
