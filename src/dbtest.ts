
import { addEmailRow, getEmailRowsToBeSent, getAllEmailRows, setEmailSent, clearAllRows, addUnsubscribedEmail, hasUnsubscribedEmail, close } from "./db"
import {
  buildEmailAction
} from './workflow'


const a = getAllEmailRows()
console.log(a.length)


const b = getEmailRowsToBeSent()
console.log("b", b.length)


buildEmailAction([{ body: "n", subject: "d", trigger: "ads", from: "adx", sendDelay: 1 }], "sendTo")