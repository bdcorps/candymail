import { Email, MessageRow } from './types/types'
import { addEmailRow, getEmailRowsToBeSent, getAllEmailRows, clearAllRows } from "./db"

const addScheduledMessage = (time: string, messageOptions: Email) => {
  addEmailRow(time, messageOptions)
}

const getScheduledMessagesAtTime = (): MessageRow[] => {
  return getEmailRowsToBeSent()
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
