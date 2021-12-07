
import { addUnsubscribedEmail, hasUnsubscribedEmail } from "./db"

const unsubscribeUser = (email: string) => {
  addUnsubscribedEmail(email)
}

const hasUnsubscribed = async (email: string): Promise<boolean> => {
  return hasUnsubscribedEmail(email)
}

export { unsubscribeUser, hasUnsubscribed }
