const sqlite3 = require('sqlite3').verbose()
import { getConfig } from './config'

let db = new sqlite3.Database('./candymail.db', (err) => {
  if (err) {
    console.log('Problem connecting to the database')
  }
})

db.serialize(function () {
  const config = getConfig()
  const {
    config: {
      db: { reset },
    },
  } = config

  if (reset) {
    db.run('DROP TABLE messages')
  }
  db.run('CREATE TABLE IF NOT EXISTS messages (info TEXT)')

  var stmt = db.prepare('INSERT INTO messages VALUES (?)')
  for (var i = 0; i < 10; i++) {
    stmt.run('Ipsum ' + i)
  }
  stmt.finalize()

  db.each('SELECT rowid AS id, info FROM messages', function (err, row) {
    console.log(row.id + ': ' + row.info)
  })
})

db.close()
