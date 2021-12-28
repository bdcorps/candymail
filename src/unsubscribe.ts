import { addUnsubscribedEmail, hasUnsubscribedEmail } from './db'

const unsubscribeUser = async (email: string) => {
  await addUnsubscribedEmail(email)
}

const hasUnsubscribed = async (email: string): Promise<boolean> => {
  const isUnsubscribed = await hasUnsubscribedEmail(email)
  return isUnsubscribed
}

export { unsubscribeUser, hasUnsubscribed }
