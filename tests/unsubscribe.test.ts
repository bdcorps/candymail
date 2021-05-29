import * as scheduler from '../index'
import { addScheduledMessage, getScheduledMessagesAtTime } from '../src/queue'
import { unsubscribeUser, hasUnsubscribed } from '../src/unsubscribe'
import * as db from "../src/db"
jest.mock('../src/db');
jest.mock('../src/queue');

// describe('Basic Tests', () => {
//   afterEach(() => {
//     jest.clearAllMocks()
//     jest.resetAllMocks()
//   })
//   test('should throw an error when email about to be sent to unsubscribed user', () => {
//     Date.now = jest.fn(() => new Date('2020-08-20T03:20:30Z').valueOf())
//     const dateString = new Date(Date.now()).toISOString()

//     const user = 'unsubscribeduser@gmail.com'
//     addScheduledMessage(dateString, {
//       template: 'template',
//       sendFrom: 'sendFrom',
//       sendTo: user,
//       subject: 'subject',
//       body: 'body',
//     })

//     unsubscribeUser(user)



//     expect(db.addEmailRow).toHaveBeenCalledTimes(1)
//   })
// })
