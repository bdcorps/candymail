import * as dotenv from "dotenv"
dotenv.config()

import { MessageRow } from "./src/types/types"
import * as cron from 'node-cron'
import * as moment from 'moment'
import { sendEmail } from './src/utils/helper'
import { log } from './src/utils/logger'

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
import { getConfig } from "./src/config"

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

const sendMessagesNow = async () => {
  log(`cron trigger > ${moment.utc().format("YYYY-MM-DD HH:mm:ss")}`)
  const today = moment.utc().format("YYYY-MM-DD HH:mm:ss")
  const messagesToBeSent = await getScheduledMessagesAtTime(today)

  if (messagesToBeSent) {
    messagesToBeSent.forEach((message: MessageRow) => {
      sendEmail(message)
    })
  }
}


sendMessagesNow()

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