import { Email } from './types/types'
import { addEmailRow, getEmailRows, getAllEmailRows, clearAllRows } from "./db"

const addScheduledMessage = (time: string, messageOptions: Email) => {
  addEmailRow(time, messageOptions)
}

const getScheduledMessagesAtTime = (time: string) => {
  return getEmailRows(time)
}

const getAllScheduledMessages = () => {
  return getAllEmailRows()
}

const clearAllScheduledMessages = () => {
  clearAllRows()
}

export {
  addScheduledMessage,
  getScheduledMessagesAtTime,
  getAllScheduledMessages,
  clearAllScheduledMessages,
}
