const sqlite3 = require('better-sqlite3') // tslint:disable-line

const getDB = () => {
  const db = sqlite3('./candymail.db')
  return db;
}

export { getDB }