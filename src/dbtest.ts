
import { addEmailRow, getEmailRowsToBeSent, getAllEmailRows, setEmailSent, clearAllRows, addUnsubscribedEmail, hasUnsubscribedEmail, close } from "./db"

import * as moment from 'moment';
import {
  getAllScheduledMessages,
  getScheduledMessagesBeforeTime,
  clearAllScheduledMessages,
} from './queue'

(async () => {
  const today = moment.utc().format("YYYY-MM-DD HH:mm:ss");
  const messagesToBeSent = await getScheduledMessagesBeforeTime(today)
  console.log(messagesToBeSent)
})()
