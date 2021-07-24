import { Email, MessageRow } from './types'
import { addEmailRow, getEmailRowsToBeSent, getAllEmailRows, clearAllRows } from "./db"

const addScheduledMessage = async (time: string, messageOptions: Email) => {
  await addEmailRow(time, messageOptions)
}

const getScheduledMessagesBeforeTime = async (time: string): Promise<MessageRow[]> => {
  const emails = await getEmailRowsToBeSent(time)

  const messages: MessageRow[] = []

  for (const email of emails) {
    const message: MessageRow = { id: email.id, email: { template: email.template, sendFrom: email.sendFrom, sendTo: email.sendTo, subject: email.subject, body: email.body } }
    messages.push(message)
  }

  return messages
}

const getAllScheduledMessages = async (): Promise<MessageRow[]> => {
  const emails = await getAllEmailRows()

  const messages: MessageRow[] = []

  for (const email of emails) {
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
