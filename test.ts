import { createConnection, getConnection, Connection } from 'typeorm';
import { User } from './src/entity/User';
import { addEmailRow, getAllEmailRows } from './src/db'

import { genConnection } from './src/db/connection'
import { Message } from './src/entity/Message';
import { Email } from './src/types';

(async () => {
  const db: Connection = await genConnection();
  console.log(getConnection().isConnected)

  const a = await getAllEmailRows()
  console.log(a)

  const email: Email = {body:"asd", sendFrom:"asd", sendTo:"dsa", subject:"asd", template:"asd"}
  const b = await addEmailRow("12", email)
  console.log({b})

})();






