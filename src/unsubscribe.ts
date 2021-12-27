
import { addUnsubscribedEmail, hasUnsubscribedEmail } from "./db"

const unsubscribeUser = async (email: string) => {
  await addUnsubscribedEmail(email)
}

const hasUnsubscribed = async (email: string): Promise<boolean> => {
  const isUnsubscribed = await hasUnsubscribedEmail(email)
  console.log("isUnsubscribed", isUnsubscribed)
  return isUnsubscribed
}

export { unsubscribeUser, hasUnsubscribed }
