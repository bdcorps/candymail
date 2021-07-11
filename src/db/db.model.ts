const sqlite3 = require('better-sqlite3')

const getDB = () => {
  const db = sqlite3('./candymail.db')
  return db;
}

export { getDB }