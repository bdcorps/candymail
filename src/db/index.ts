// const sqlite3 = require('sqlite3').verbose()
import { getConfig } from '../config'
import * as sqlite3 from 'better-sqlite3'
import { Email } from '../types/types'
import { log } from '../utils/logger'
import * as moment from 'moment'

const db = sqlite3('./candymail.db');

const stmt = db.prepare('CREATE TABLE IF NOT EXISTS messages (id INTEGER PRIMARY KEY AUTOINCREMENT, time datetime, template TEXT, sendFrom TEXT, sendTo TEXT, subject TEXT, body TEXT, sent INT)');
stmt.run()

const stmt2 = db.prepare('CREATE TABLE IF NOT EXISTS unsubscribed (id INTEGER PRIMARY KEY AUTOINCREMENT, email TEXT)');
stmt2.run()

const addEmailRow = (time: string, messageOptions: Email) => {

  log(`adding email row for ${time} with message: ${messageOptions.body} `)
  const { template, sendFrom, sendTo, subject, body } = messageOptions

  const stmt = db.prepare('INSERT INTO messages (time,template,sendFrom,sendTo,subject,body, sent) VALUES (?,?,?,?,?,?,?)');


  try {
    stmt.run(time, template, sendFrom, sendTo, subject, body, 0)
  } catch (err) {
    log(err)
  }

}


const getEmailRowsToBeSent = () => {
  let sql = db.prepare(`SELECT * FROM messages WHERE time <= date('now') AND sent=0`);

  let emails = []

  try {
    emails = sql.all()
  } catch (err) {
    log(err)
  }

  log(`getting emails before time: ${emails.length}`)

  return emails
}

const getAllEmailRows = () => {
  let sql = db.prepare(`SELECT * FROM messages ORDER BY time`);

  let emails = []

  try {
    emails = sql.all()
  } catch (err) {
    log(err)
  }

  return emails
}

const setEmailSent = (id: number) => {
  let sql = db.prepare(`UPDATE messages SET sent = 1 WHERE id = ?`);

  try {
    sql.run(id)
  } catch (err) {
    log(err)
  }
}

const clearAllRows = () => {
  const stmt = db.prepare('TRUNCATE TABLE messages');
  try {
    stmt.run()
  } catch (err) {
    log(err)
  }
}

const close = () => {
  db.close()
}

const addUnsubscribedEmail = (email: string) => {
  const stmt = db.prepare('INSERT INTO unsubscribed (email) VALUES (?)');
  try {
    stmt.run(email)
  } catch (err) {
    log(err)
  }
}

const hasUnsubscribedEmail = (email: string): boolean => {
  let sql = db.prepare(`SELECT * FROM unsubscribed WHERE email = ?`);

  let emails = []

  try {
    emails = sql.all(email)
  } catch (err) {
    log(err)
  }

  return emails.length > 0
}

export { addEmailRow, getEmailRowsToBeSent, getAllEmailRows, setEmailSent, clearAllRows, addUnsubscribedEmail, hasUnsubscribedEmail, close }
