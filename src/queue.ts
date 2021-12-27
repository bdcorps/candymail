import { Email, MessageRow } from './types'
import { addEmailRow, getEmailRowsToBeSent, getAllEmailRows, clearAllRows } from "./db"

const addScheduledMessage = async (messageOptions: Email) => {
  await addEmailRow(messageOptions)
}

const getScheduledMessagesBeforeTime = async (time: Date): Promise<MessageRow[]> => {
  const emails = await getEmailRowsToBeSent(time)

  const messages: MessageRow[] = emails.map(email => ({ id: email.id, email }))

  return messages
}

const getAllScheduledMessages = async (): Promise<MessageRow[]> => {
  const emails = await getAllEmailRows()

  const messages: MessageRow[] = emails.map(email => ({ id: email.id, email }))

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
