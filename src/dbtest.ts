
import { addEmailRow, getEmailRowsToBeSent, getAllEmailRows, setEmailSent, clearAllRows, addUnsubscribedEmail, hasUnsubscribedEmail, close } from "./db"
import {
  buildEmailAction
} from './workflow'
import * as moment from 'moment';
import {
  getAllScheduledMessages,
  getScheduledMessagesAtTime,
  clearAllScheduledMessages,
} from './queue'

// const a = getAllEmailRows()
// console.log(a.length)


// const b = getEmailRowsToBeSent("")
// console.log("b", b.length)


// buildEmailAction([{ body: "n", subject: "d", trigger: "ads", from: "adx", sendDelay: 1 }], "sendTo")

(async () => {
  const today = moment.utc().format("YYYY-MM-DD HH:mm:ss");
  const messagesToBeSent = await getScheduledMessagesAtTime(today)
  console.log(messagesToBeSent)
})()
