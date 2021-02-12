import * as dotenv from "dotenv"
dotenv.config()

import { Email } from "./src/types/types"
import * as cron from 'node-cron'
import { generateDateKey, sendEmail } from './src/utils/helper'

import {
  getAllScheduledMessages,
  getScheduledMessagesAtTime,
  clearAllScheduledMessages,
} from './src/messages'

import {
  unsubscribeUser
} from './src/unsubscribe'

import {
  init,
  runAutomation
} from './src/scheduler'

const task = cron.schedule(
  '0 * * * *',
  () => {
    sendMessagesNow()
  },
  {
    scheduled: false,
  }
)

const start = () => {
  task.start()
}

const stop = () => {
  task.stop()
}

const destroy = () => {
  task.destroy()
}

const sendMessagesNow = () => {
  const today = new Date(Date.now())
  const dateKey = generateDateKey(today)
  const messagesToBeSent = getScheduledMessagesAtTime(dateKey)

  if (messagesToBeSent) {
    messagesToBeSent.forEach((message: Email) => {
      sendEmail(message)
    })
  }
}

export {
  init,
  start,
  stop,
  destroy,
  runAutomation,
  getAllScheduledMessages,
  getScheduledMessagesAtTime,
  clearAllScheduledMessages,
  sendMessagesNow,
  unsubscribeUser
}