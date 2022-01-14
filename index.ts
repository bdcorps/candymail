import * as dotenv from 'dotenv'
dotenv.config()

import * as cron from 'node-cron'
import * as moment from 'moment'
import { sendEmail } from './src/utils/helper'
import { log } from './src/utils/logger'

import {
  getAllScheduledMessages,
  getScheduledMessagesBeforeTime,
  clearAllScheduledMessages,
} from './src/queue'

import { hasUnsubscribed, unsubscribeUser } from './src/unsubscribe'

import { init } from './src/automation'

import { runWorkflow } from './src/workflow'

const task = cron.schedule(
  '* * * * *',
  async () => {
    await sendMessagesNow()
  },
  {
    scheduled: false,
  }
)

const start = async () => {
  task.start()
}

const stop = () => {
  task.stop()
}

const destroy = () => {
  task.destroy()
}

const sendMessagesNow = async () => {
  const today = moment.utc().toDate()
  const messagesToBeSent = await getScheduledMessagesBeforeTime(today)

  if (messagesToBeSent) {
    for (const message of messagesToBeSent) {
      const {
        email: { sendTo },
      } = message
      const isUnsubscribed = await hasUnsubscribed(sendTo)
      if (isUnsubscribed) {
        log(`The user ${sendTo} you are trying to send a message to has already unsubscribed`)
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
  unsubscribeUser,
}
