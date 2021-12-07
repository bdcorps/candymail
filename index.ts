import * as dotenv from "dotenv"
dotenv.config()

import { MessageRow } from "./src/types"
import * as cron from 'node-cron'
import * as moment from 'moment'
import { sendEmail } from './src/utils/helper'
import { log } from './src/utils/logger'
import { genConnection } from './src/db/connection'

import {
  getAllScheduledMessages,
  getScheduledMessagesBeforeTime,
  clearAllScheduledMessages,
} from './src/queue'

import {
  hasUnsubscribed,
  unsubscribeUser
} from './src/unsubscribe'

import {
  init
} from './src/automation'

import {
  runWorkflow
} from './src/workflow'
import { Connection } from "typeorm"

const task = cron.schedule(
  '0 * * * *',
  async () => {
    await sendMessagesNow()
  },
  {
    scheduled: false,
  }
)

const start = async () => {
  console.log("start");
  const db:Connection = await genConnection();
  console.log({isconnect: db.isConnected})

  task.start();
  console.log("started");
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
  const messagesToBeSent = await getScheduledMessagesBeforeTime(today)

  if (messagesToBeSent) {

    for (const message of messagesToBeSent){
      const { email: { sendTo } } = message
      const isUnsubscribed = await hasUnsubscribed(sendTo)
      if (isUnsubscribed) {
        log(
          `The user ${sendTo} you are trying to send a message to has already unsubscribed`
        )
      } else {
        sendEmail(message)
      }
    }
  }
}

export {
  init,
  start,
  stop,
  destroy,
  runWorkflow,
  getAllScheduledMessages,
  getScheduledMessagesBeforeTime,
  clearAllScheduledMessages,
  sendMessagesNow,
  unsubscribeUser
}