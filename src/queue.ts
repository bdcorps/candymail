import { Email, MessageRow } from './types'
import { addEmailRow, getEmailRowsToBeSent, getAllEmailRows, clearAllRows } from "./db"

const addScheduledMessage = (time: string, messageOptions: Email) => {
  addEmailRow(time, messageOptions)
}

const getScheduledMessagesBeforeTime = (time: string): MessageRow[] => {
  const emails = getEmailRowsToBeSent(time)

  const messages: MessageRow[] = []

  for (let email of emails) {
    const message: MessageRow = { id: email.id, email: { template: email.template, sendFrom: email.sendFrom, sendTo: email.sendTo, subject: email.subject, body: email.body } }
    messages.push(message)
  }

  return messages
}

const getAllScheduledMessages = (): MessageRow[] => {
  const emails = getAllEmailRows()

  const messages: MessageRow[] = []

  for (let email of emails) {
    const message: MessageRow = { id: email.id, email: { template: email.template, sendFrom: email.sendFrom, sendTo: email.sendTo, subject: email.subject, body: email.body } }
    messages.push(message)
  }

  return messages
}

const clearAllScheduledMessages = () => {
  clearAllRows()
}

export {
  addScheduledMessage,
  getScheduledMessagesBeforeTime,
  getAllScheduledMessages,
  clearAllScheduledMessages,
}
