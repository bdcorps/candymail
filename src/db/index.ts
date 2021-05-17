const sqlite3 = require('sqlite3').verbose()
import { getConfig } from '../config'
import { Email } from '../types/types'

console.log(getConfig())

let db = new sqlite3.Database('./candymail.db', (err: any) => {
  if (err) {
    return console.error(err.message);
  }
  console.log('Connected to the in-memory SQlite database.');
})

db.serialize(function () {
  const config = getConfig()
  // const { db: { reset } } = config

  // if (reset) {
  //   db.run('DROP TABLE messages')
  // }

  db.run('CREATE TABLE IF NOT EXISTS messages (id INTEGER PRIMARY KEY AUTOINCREMENT, time TEXT, template TEXT, sendFrom TEXT, sendTo TEXT, subject TEXT, body TEXT)')
})

const addEmailRow = (time: string, messageOptions: Email) => {
  const { template, sendFrom, sendTo, subject, body } = messageOptions
  db.run(`INSERT INTO messages (time,template,sendFrom,sendTo,subject,body) VALUES (?,?,?,?,?,?)`, time, template, sendFrom, sendTo, subject, body)
}


const getEmailRows = (time: string) => {
  let sql = `SELECT * FROM messages WHERE time=? ORDER BY time`;

  let emails = null
  db.all(sql, [time], (err: any, rows: any) => {
    if (err) {
      throw err;
    }
    emails = rows
  });

  console.log("sukh email", emails)

  return []
}

const getAllEmailRows = () => {
  let sql = `SELECT * FROM messages ORDER BY time`;

  let emails = null
  db.all(sql, [], (err: any, rows: any) => {
    if (err) {
      throw err;
    }
    emails = rows
  });

  return emails
}

const clearAllRows = () => {
  db.run(`TRUNCATE TABLE messages`)
}

const close = () => {
  db.close()
}

// close()

export { addEmailRow, getEmailRows, getAllEmailRows, clearAllRows }
