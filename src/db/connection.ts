import { createConnection, getConnection } from 'typeorm'
import { User } from '../entity/User'
import { Message } from '../entity/Message'

export const genConnection = async () => {
  await createConnection({
    type: 'sqlite',
    database: './candymail.sql',
    dropSchema: true,
    entities: [User, Message],
    synchronize: true,
  })
}

export const getDB = async () => {
  return await getConnection()
}
