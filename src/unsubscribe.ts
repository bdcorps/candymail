
import { addUnsubscribedEmail, hasUnsubscribedEmail } from "./db"

const unsubscribeUser = (email: string) => {
  addUnsubscribedEmail(email)
}

const hasUnsubscribed = (email: string): boolean => {
  return hasUnsubscribedEmail(email)
}

export { unsubscribeUser, hasUnsubscribed }
