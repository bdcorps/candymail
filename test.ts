import { createConnection, getConnection, Connection } from 'typeorm';
import { User } from './src/entity/User';
import { a } from './src/db/db.service'

import { genConnection } from './src/db/connection'
import { Message } from './src/entity/Message';

(async () => {
  const db: Connection = await genConnection();
  console.log(getConnection().isConnected)

  await a()

})();






