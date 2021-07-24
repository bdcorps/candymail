
import { addUnsubscribedEmail, hasUnsubscribedEmail } from "./db"

const unsubscribeUser = async (email: string) => {
  await addUnsubscribedEmail(email)
}

const hasUnsubscribed = async (email: string): Promise<boolean> => {
  return await hasUnsubscribedEmail(email)
}

export { unsubscribeUser, hasUnsubscribed }
