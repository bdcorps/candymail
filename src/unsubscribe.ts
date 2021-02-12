const unsubscribedUsers: string[] = []

const unsubscribeUser = (email: string) => {
  unsubscribedUsers.push(email)
}

const hasUnsubscribed = (email: string) => {
  return unsubscribedUsers.includes(email)
}

export { unsubscribeUser, hasUnsubscribed }
