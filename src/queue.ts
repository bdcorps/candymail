import { Email, MessageRow } from './types/types'
import { addEmailRow, getEmailRows, getAllEmailRows, clearAllRows } from "./db"

const addScheduledMessage = (time: string, messageOptions: Email) => {
  addEmailRow(time, messageOptions)
}

const getScheduledMessagesAtTime = (): MessageRow[] => {
  return getEmailRows()
}

const getAllScheduledMessages = (): MessageRow[] => {
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
