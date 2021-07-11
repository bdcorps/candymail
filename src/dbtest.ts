
import { addEmailRow, getEmailRowsToBeSent, getAllEmailRows, setEmailSent, clearAllRows, addUnsubscribedEmail, hasUnsubscribedEmail, close } from "./db"

import * as moment from 'moment';
import {
  getAllScheduledMessages,
  getScheduledMessagesBeforeTime,
  clearAllScheduledMessages,
} from './queue'

// const a = getAllEmailRows()
// console.log(a.length)


// const b = getEmailRowsToBeSent("")
// console.log("b", b.length)


// buildEmailAction([{ body: "n", subject: "d", trigger: "ads", from: "adx", sendDelay: 1 }], "sendTo")

(async () => {
  const today = moment.utc().format("YYYY-MM-DD HH:mm:ss");
  const messagesToBeSent = await getScheduledMessagesBeforeTime(today)
  console.log(messagesToBeSent)
})()
