// const sqlite3 = require('sqlite3').verbose()
import { Email, EmailDB } from '../../types'

let emailsdb: EmailDB[] = [{ body: "asd", sendTo: "d", sendFrom: "d", id: 1, template: "d", sent: 0, subject: "sda", time: "2020-08-20 02:20:30" },
{ body: "asd", sendTo: "d", sendFrom: "d", id: 2, template: "d", sent: 0, subject: "sda", time: "2020-08-20 06:20:30" }]

const addEmailRow = (time: string, messageOptions: Email) => {
  const email: EmailDB = { body: "asd", sendTo: messageOptions.sendTo, sendFrom: messageOptions.sendFrom, id: 1, template: messageOptions.template, sent: 0, subject: "sda", time }

  emailsdb.push(email)
}

const getEmailRowsToBeSent = async (): Promise<EmailDB[]> => {
  return Promise.resolve([emailsdb[0]])
}

const getAllEmailRows = async (): Promise<EmailDB[]> => {
  return emailsdb
}

const setEmailSent = async (id: number) => {
  emailsdb.forEach((email, index, theArray) => {
    if (email.id === id) {
      email.sent = 1;
      theArray[index] = email
      return
    }
  });
}

const clearAllRows = async () => {
  emailsdb = []
}

export {
  getAllEmailRows, setEmailSent, addEmailRow, getEmailRowsToBeSent, clearAllRows
}