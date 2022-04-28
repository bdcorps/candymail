import { Email } from '../types'
import { log } from '../utils/logger'
import * as moment from 'moment'
import { LessThan, getRepository } from 'typeorm'
import { User } from '../entity/User'
import { Message } from '../entity/Message'

const addEmailRow = async (messageOptions: Email) => {
  const userRepository = getRepository(User)
  const messageRepository = getRepository(Message)

  log(`adding email row for ${messageOptions.sendAt} with message: ${messageOptions.body}`)
  const { template, sendFrom, sendTo, sendAt, subject, body } = messageOptions

  const user = await userRepository.find({ email: sendTo })
  if (!user) {
    const newUser = new User()
    newUser.email = sendTo
    newUser.isSubscribed = true

    await userRepository.save(newUser)
  }

  const message = new Message()
  message.template = template
  message.sendFrom = sendFrom
  message.sendTo = sendTo
  message.sendAt = sendAt
  message.subject = subject
  message.body = body

  await messageRepository.save(message)
}

const getEmailRowsToBeSent = async (time: Date): Promise<Message[]> => {
  const messageRepository = getRepository(Message)

  const messages = await messageRepository.find({
    where: {
      sent: false,
      sendAt: LessThan(moment.utc().format("YYYY-MM-DD HH:mm:ss")),
    },
  })

  if (messages === undefined) {
    return []
  }

  return messages
}

const getAllEmailRows = async (): Promise<Message[]> => {
  const messageRepository = getRepository(Message)
  const messages: Message[] = await messageRepository.find({})
  return messages
}

const setEmailSent = async (id: number) => {
  const messageRepository = getRepository(Message)

  const message = await messageRepository.findOne({ id })

  if (message === undefined) {
    return
  }

  message.sent = true

  await messageRepository.save(message)
}

const clearAllRows = async () => {
  const messageRepository = getRepository(Message)

  await messageRepository.clear()
}

const addUnsubscribedEmail = async (email: string) => {
  const userRepository = getRepository(User)

  const user: User | undefined = await userRepository.findOne({ email })

  if (user === undefined) {
    return
  }

  user.isSubscribed = false
  await userRepository.save(user)
}

const hasUnsubscribedEmail = async (email: string): Promise<boolean> => {
  const userRepository = getRepository(User)

  const user: User | undefined = await userRepository.findOne({ email, isSubscribed: false })

  if (user === undefined) {
    return false
  }

  return user.isSubscribed
}

export {
  addEmailRow,
  getEmailRowsToBeSent,
  getAllEmailRows,
  setEmailSent,
  clearAllRows,
  addUnsubscribedEmail,
  hasUnsubscribedEmail,
}
