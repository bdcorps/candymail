// const sqlite3 = require('sqlite3').verbose()
import { getConfig } from '../config'
import * as sqlite3 from 'better-sqlite3'
import { Email } from '../types/types'


const db = sqlite3('./candymail.db');

const stmt = db.prepare('CREATE TABLE IF NOT EXISTS messages (id INTEGER PRIMARY KEY AUTOINCREMENT, time datetime, template TEXT, sendFrom TEXT, sendTo TEXT, subject TEXT, body TEXT, sent INT)');
stmt.run()

const stmt2 = db.prepare('CREATE TABLE IF NOT EXISTS unsubscribed (id INTEGER PRIMARY KEY AUTOINCREMENT, email TEXT)');
stmt2.run()


const addEmailRow = (time: string, messageOptions: Email) => {
  console.log("sukh", time, messageOptions)
  const { template, sendFrom, sendTo, subject, body } = messageOptions

  const stmt = db.prepare('INSERT INTO messages (time,template,sendFrom,sendTo,subject,body, sent) VALUES (?,?,?,?,?,?,?)');
  stmt.run(time, template, sendFrom, sendTo, subject, body, 0)
}


const getEmailRows = (time: string) => {
  let sql = db.prepare(`SELECT * FROM messages WHERE time < DATE(?) AND sent=0`);

  return sql.all(time)
}

const getAllEmailRows = () => {
  let sql = db.prepare(`SELECT * FROM messages ORDER BY time`);

  console.log("sukh getall", sql.all())
  return sql.all()
}

const setEmailSent = (id: number) => {
  console.log("sukh id to be sent is ", id)
  let sql = db.prepare(`UPDATE messages SET sent = 1 WHERE id = ?`);
  sql.run(id)
}

const clearAllRows = () => {
  const stmt = db.prepare('TRUNCATE TABLE messages');
  stmt.run();
}

const close = () => {
  db.close()
}

const addUnsubscribedEmail = (email: string) => {
  const stmt = db.prepare('INSERT INTO unsubscribed (email) VALUES (?)');
  stmt.run(email)
}

const hasUnsubscribedEmail = (email: string): boolean => {
  let sql = db.prepare(`SELECT * FROM unsubscribed WHERE email = ?`);

  return sql.all(email).length > 0
}

// close()

export { addEmailRow, getEmailRows, getAllEmailRows, setEmailSent, clearAllRows, addUnsubscribedEmail, hasUnsubscribedEmail }
