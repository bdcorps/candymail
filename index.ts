import * as dotenv from "dotenv"
dotenv.config()

import { MessageRow } from "./src/types/types"
import * as cron from 'node-cron'
import { generateDateKey, sendEmail } from './src/utils/helper'

import {
  getAllScheduledMessages,
  getScheduledMessagesAtTime,
  clearAllScheduledMessages,
} from './src/queue'

import {
  unsubscribeUser
} from './src/unsubscribe'

import {
  init,
  runWorkflow
} from './src/workflow'

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
  console.log("sukh start")
  task.start()
}

const stop = () => {
  task.stop()
}

const destroy = () => {
  task.destroy()
}

const sendMessagesNow = async () => {
  const today = new Date(Date.now())
  console.log("sukh all messages and time", getAllScheduledMessages(), today)
  const messagesToBeSent = await getScheduledMessagesAtTime()
  console.log("sukh to send out now", messagesToBeSent)

  if (messagesToBeSent) {
    messagesToBeSent.forEach((message: MessageRow) => {
      console.log("sukh mes", message)
      sendEmail(message)
    })
  }
}

export {
  init,
  start,
  stop,
  destroy,
  runWorkflow,
  getAllScheduledMessages,
  getScheduledMessagesAtTime,
  clearAllScheduledMessages,
  sendMessagesNow,
  unsubscribeUser
}