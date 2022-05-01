import { createConnection, getConnection } from 'typeorm'
import { User } from '../entity/User'
import { Message } from '../entity/Message'
import { getConfig } from '../config'

export const genConnection = async () => {
  await createConnection({
    type: 'sqlite',
    database: './candymail.sql',
    dropSchema: getConfig()?.db?.reset != null ? getConfig().db.reset : true,
    entities: [User, Message],
    synchronize: true,
  })
}

export const getDB = async () => {
  return await getConnection()
}
