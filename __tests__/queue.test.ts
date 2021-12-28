import {
  addScheduledMessage,
  getAllScheduledMessages,
  getScheduledMessagesBeforeTime,
} from '../src/queue'
import { sampleMessages } from '../src/utils/setupTests'
import typeorm = require('typeorm')

describe('Unit Tests', () => {
  typeorm.getRepository = jest.fn().mockReturnValue({
    find: jest.fn().mockResolvedValue(sampleMessages),
    save: jest.fn().mockResolvedValue(sampleMessages[0]),
  })

  test('should get all messages in the db', async () => {
    const messages = await getAllScheduledMessages()
    expect(messages.length).toBe(1)
  })

  test('should get all messages in the db before time', async () => {
    const messages = await getScheduledMessagesBeforeTime(
      new Date(Date.parse('2020-08-20T02:30:30'))
    )

    expect(messages.length).toBe(1)
  })

  // "2020-08-20 02:30:30"
  test('add scheduled message', async () => {
    await addScheduledMessage({
      body: 'asd',
      sendTo: 'd',
      sendFrom: 'd',
      template: 'd',
      subject: 'sda',
      sendAt: new Date(Date.parse('2020-08-20T02:30:30')),
    })

    const messages = await getAllScheduledMessages()
    expect(messages.length).toBe(1)
  })
})
