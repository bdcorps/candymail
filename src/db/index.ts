import { getConfig } from '../config'
import * as SQLite3 from 'better-sqlite3'
import { Email, EmailDB } from '../types'
import { log } from '../utils/logger'
import * as moment from 'moment'
import { createConnection, getConnection, Connection, LessThan } from 'typeorm';
import { User } from '../entity/User';
import { Message } from '../entity/Message'

const addEmailRow = async (time: string, messageOptions: Email) => {
  const db = getConnection()
  const userRepository = db.getRepository(User);
  const messageRepository = db.getRepository(Message);

  log(`adding email row for ${time} with message: ${messageOptions.body}`)
  const { template, sendFrom, sendTo, subject, body } = messageOptions

  const user = await userRepository.find({ email: sendTo })
  if (!user) {
    console.log("sukh user not found: ", sendTo)
    const newUser = new User();
    newUser.email = sendTo;
    newUser.isSubscribed = true;

    await userRepository
      .save(newUser)
  }


  const message = new Message();
  message.template = template;
  message.sendFrom = sendFrom;
  message.sendTo = sendTo;
  message.subject = subject;
  message.body = body;

  await messageRepository
    .save(message)
}

const getEmailRowsToBeSent = async (time: string): Promise<Message[]> => {
  const db = getConnection()
  const messageRepository = db.getRepository(Message);

  const messages = await messageRepository
    .find({
      where: {
        sent: false,
        last_modified: LessThan(time)
      }
    })

  if (messages === undefined) { return []; }

  return messages
}

const getAllEmailRows = async () => {
  const db = getConnection()
  const messageRepository = db.getRepository(Message);

  const messages: Message[] = await messageRepository
    .find()
  log(messages.toString())
  return messages
}

const setEmailSent = async (id: number) => {
  const db = getConnection()
  const messageRepository = db.getRepository(Message);

  const message = await messageRepository
    .findOne({ id })

  if (message === undefined) { return; }

  message.sent = true;

  await messageRepository
    .save(message)
}

const clearAllRows = async () => {
  const db = getConnection()
  const messageRepository = db.getRepository(Message);

  await messageRepository.clear();
}

const addUnsubscribedEmail = async (email: string) => {
  const db = getConnection()
  const userRepository = db.getRepository(User);

  const user: User | undefined = await userRepository.findOne({ email })

  if (user === undefined) { return; }

  user.isSubscribed = false;
  await userRepository
    .save(user)
}

const hasUnsubscribedEmail = async (email: string): Promise<boolean> => {
  const db = getConnection()
  const userRepository = db.getRepository(User);

  const user: User | undefined = await userRepository.findOne({ email })

  if (user === undefined) { return true; }

  return user.isSubscribed
}


export { addEmailRow, getEmailRowsToBeSent, getAllEmailRows, setEmailSent, clearAllRows, addUnsubscribedEmail, hasUnsubscribedEmail }
