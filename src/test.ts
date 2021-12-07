import { createConnection, getConnection, Connection } from 'typeorm';
import { User } from './entity/User';
import { addEmailRow, getAllEmailRows } from './db'

import { genConnection } from './db/connection'
import { Message } from './entity/Message';
import { Email } from './types';

(async () => {
  const db: Connection = await genConnection();
  console.log(getConnection().isConnected)

  const a = await getAllEmailRows()
  console.log(a)

  //TODO: fix this test, check sendAt
  const email: Email = {body:"asd", sendFrom:"asd", sendTo:"dsa", sendAt:new Date(Date.now()), subject:"asd", template:"asd"}
  const b = await addEmailRow(email)
  console.log({b})

})();






