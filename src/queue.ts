import { Email, MessageRow } from './types'
import { addEmailRow, getEmailRowsToBeSent, getAllEmailRows, clearAllRows } from "./db"

const addScheduledMessage = async (messageOptions: Email) => {
  await addEmailRow(messageOptions)
}

const getScheduledMessagesBeforeTime = async (time: Date): Promise<MessageRow[]> => {
  const emails = await getEmailRowsToBeSent(time)

  const messages: MessageRow[] = []

  for (const email of emails) {
    const message: MessageRow = { id: email.id, email }
    messages.push(message)
  }

  return messages
}

const getAllScheduledMessages = async (): Promise<MessageRow[]> => {
  const emails = await getAllEmailRows()

  const messages: MessageRow[] = []

  for (const email of emails) {
    const message: MessageRow = { id: email.id, email }
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
