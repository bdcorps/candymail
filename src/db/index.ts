import { getConfig } from '../config'
import * as SQLite3 from 'better-sqlite3'
import { Email, EmailDB } from '../types'
import { log } from '../utils/logger'
import * as moment from 'moment'
import { getDB } from './db.model'

const db = getDB()

const stmt = db.prepare('CREATE TABLE IF NOT EXISTS messages (id INTEGER PRIMARY KEY AUTOINCREMENT, time datetime, template TEXT, sendFrom TEXT, sendTo TEXT, subject TEXT, body TEXT, sent INT)');
stmt.run()

const stmt2 = db.prepare('CREATE TABLE IF NOT EXISTS unsubscribed (id INTEGER PRIMARY KEY AUTOINCREMENT, email TEXT)');
stmt2.run()

const addEmailRow = (time: string, messageOptions: Email) => {

  log(`adding email row for ${time} with message: ${messageOptions.body}`)
  const { template, sendFrom, sendTo, subject, body } = messageOptions

  const query = db.prepare('INSERT INTO messages (time,template,sendFrom,sendTo,subject,body, sent) VALUES (?,?,?,?,?,?,?)');

  try {
    query.run(time, template, sendFrom, sendTo, subject, body, 0)
  } catch (err) {
    log(err)
  }
}

const getEmailRowsToBeSent = (time: string): EmailDB[] => {
  const sql = db.prepare(`SELECT * FROM messages WHERE time <= datetime(?) AND sent=0`);

  let emails = []

  try {
    emails = sql.all(time)
  } catch (err) {
    log(err)
  }

  log(`getting emails before time: ${emails.length}`)
  const emailsdb: EmailDB[] = emails

  return emailsdb
}

const getAllEmailRows = (): EmailDB[] => {
  const sql = db.prepare(`SELECT * FROM messages ORDER BY time`);

  let emails = []

  try {
    emails = sql.all()
  } catch (err) {
    log(err)
  }

  const emailsdb: EmailDB[] = emails

  return emailsdb
}

const setEmailSent = (id: number) => {
  const sql = db.prepare(`UPDATE messages SET sent = 1 WHERE id = ?`);

  try {
    sql.run(id)
  } catch (err) {
    log(err)
  }
}

const clearAllRows = () => {
  const query = db.prepare('DELETE from messages');
  try {
    query.run()
  } catch (err) {
    log(err)
  }
}

const close = () => {
  db.close()
}

const addUnsubscribedEmail = (email: string) => {
  const query = db.prepare('INSERT INTO unsubscribed (email) VALUES (?)');
  try {
    query.run(email)
  } catch (err) {
    log(err)
  }
}

const hasUnsubscribedEmail = (email: string): boolean => {
  const sql = db.prepare(`SELECT * FROM unsubscribed WHERE email = ?`);

  let emails = []

  try {
    emails = sql.all(email)
  } catch (err) {
    log(err)
  }

  return emails.length > 0
}

export { addEmailRow, getEmailRowsToBeSent, getAllEmailRows, setEmailSent, clearAllRows, addUnsubscribedEmail, hasUnsubscribedEmail, close }
